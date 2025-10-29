#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const interfaceDir = path.join(rootDir, 'packages/types/src/interfaces');
const metadataDir = path.join(rootDir, 'packages/types/src/metadata');
const packagesDir = path.join(rootDir, 'packages');

const packageSrcDirs = fs
  .readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(packagesDir, entry.name, 'src'))
  .filter((dir) => fs.existsSync(dir));

const cleanupDirs = [interfaceDir, metadataDir, ...packageSrcDirs];
const buildInfoTargets = [rootDir, packagesDir];

function walk(dir, handler) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, handler);
    } else {
      handler(full);
    }
  }
}

function rewriteImports(file) {
  const content = fs.readFileSync(file, 'utf8');
  const replaced = content
    .replace(/\.\.\/(?:\.\.\/)+type-definitions\/src\//g, '@sora-substrate/type-definitions/src/')
    .replace(/@sora-substrate\/type-definitions\/src\//g, '@sora-substrate/type-definitions/src/')
    .replace(/(from\s+['"])(\.{1,2}\/[^'"]+)\.ts(['"])/g, '$1$2.js$3')
    .replace(/(import\s+['"])(\.{1,2}\/[^'"]+)\.ts(['"])/g, '$1$2.js$3')
    .replace(/(export\s+\*?\s*from\s+['"])(\.{1,2}\/[^'"]+)\.ts(['"])/g, '$1$2.js$3');
  if (replaced !== content) {
    fs.writeFileSync(file, replaced, 'utf8');
  }
}

function removeArtifacts(file) {
  if (file.endsWith('.js') || file.endsWith('.d.ts')) {
    fs.rmSync(file, { force: true });
  }
}

walk(interfaceDir, (file) => {
  if (file.endsWith('.ts')) {
    rewriteImports(file);
  }
});

for (const dir of cleanupDirs) {
  if (fs.existsSync(dir)) {
    walk(dir, removeArtifacts);
  }
}

for (const dir of buildInfoTargets) {
  if (fs.existsSync(dir)) {
    walk(dir, (file) => {
      if (file.endsWith('.tsbuildinfo')) {
        fs.rmSync(file, { force: true });
      }
    });
  }
}
