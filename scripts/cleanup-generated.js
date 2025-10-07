#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const packages = [
  'packages/api',
  'packages/connection',
  'packages/liquidity-proxy',
  'packages/math',
  'packages/sdk',
  'packages/type-definitions',
  'packages/types',
];

const extensions = new Set(['.js', '.d.ts', '.d.ts.map']);
const relativeJsImportRegex = /(['"])(\.\.?(?:\/[^'"]+)*)\.js\1/g;

function removeGeneratedFiles(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeGeneratedFiles(fullPath);
    } else if (extensions.has(getExtension(entry.name))) {
      fs.rmSync(fullPath, { force: true });
    }
  }
}

function getExtension(filename) {
  if (filename.endsWith('.d.ts.map')) return '.d.ts.map';
  if (filename.endsWith('.d.ts')) return '.d.ts';
  return path.extname(filename);
}

for (const pkg of packages) {
  removeGeneratedFiles(path.join(pkg, 'src'));
  const tsbuildinfo = path.join(pkg, 'tsconfig.build.tsbuildinfo');
  if (fs.existsSync(tsbuildinfo)) {
    fs.rmSync(tsbuildinfo, { force: true });
  }
}

const rootTsBuildInfo = path.join('tsconfig.build.tsbuildinfo');
if (fs.existsSync(rootTsBuildInfo)) {
  fs.rmSync(rootTsBuildInfo, { force: true });
}

function fixTypeScriptExtensions(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      fixTypeScriptExtensions(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      const original = fs.readFileSync(fullPath, 'utf8');
      const updated = original.replace(
        relativeJsImportRegex,
        (_match, quote, target) => `${quote}${target}.ts${quote}`
      );

      if (updated !== original) {
        fs.writeFileSync(fullPath, updated, 'utf8');
      }
    }
  }
}

fixTypeScriptExtensions(path.join('packages', 'types', 'src', 'interfaces'));
