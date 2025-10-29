#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ncu = require('npm-check-updates');
const semver = require('semver');

const rootDir = path.join(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');

const packageFiles = [
  path.join(rootDir, 'package.json'),
  ...fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesDir, entry.name, 'package.json'))
    .filter((pkgPath) => fs.existsSync(pkgPath)),
];

const findings = {
  major: [],
  minor: [],
  prerelease: [],
};

const readPackageJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const findDependencySpec = (pkg, dependency) => {
  return (
    (pkg.dependencies && pkg.dependencies[dependency]) ||
    (pkg.devDependencies && pkg.devDependencies[dependency]) ||
    (pkg.peerDependencies && pkg.peerDependencies[dependency]) ||
    null
  );
};

const collectFindings = (pkgPath, upgrades, pkg) => {
  Object.entries(upgrades).forEach(([dependency, upgradedVersion]) => {
    const currentSpec = findDependencySpec(pkg, dependency);
    if (!currentSpec) return;

    const current = semver.minVersion(currentSpec);
    const target = semver.minVersion(upgradedVersion);

    if (!current || !target) return;

    const diff = semver.diff(current, target);

    if (!diff) return;

    const severity =
      diff === 'premajor' ? 'major' : diff === 'preminor' ? 'minor' : diff === 'prepatch' ? 'patch' : diff;

    const record = {
      packageJson: path.relative(rootDir, pkgPath),
      dependency,
      current: currentSpec,
      latest: upgradedVersion,
      level: diff,
    };

    if (severity === 'major') {
      findings.major.push(record);
    } else if (severity === 'minor') {
      findings.minor.push(record);
    } else if (diff === 'prerelease') {
      findings.prerelease.push(record);
    }
  });
};

const checkPackageJson = async (pkgPath) => {
  const packageJson = readPackageJson(pkgPath);
  const upgrades = await ncu.run({
    packageData: JSON.stringify(packageJson),
    jsonUpgraded: true,
    silent: true,
    target: 'latest',
    reject: ['workspace:*'],
  });

  if (!Object.keys(upgrades).length) return;

  collectFindings(pkgPath, upgrades, packageJson);
};

const renderFindings = (group, title) => {
  if (!group.length) return;

  console.log(`\n${title}`);
  group.forEach((finding) => {
    console.log(`  ${finding.dependency} ${finding.current} → ${finding.latest} (${finding.packageJson})`);
  });
};

(async () => {
  await packageFiles.reduce((promise, pkgPath) => promise.then(() => checkPackageJson(pkgPath)), Promise.resolve());

  const hasMajor = findings.major.length > 0;
  const hasMinor = findings.minor.length > 0;
  const hasPrerelease = findings.prerelease.length > 0;

  renderFindings(findings.major, '⚠️  Major upgrades available:');
  renderFindings(findings.minor, 'ℹ️  Minor upgrades available:');
  renderFindings(findings.prerelease, '🔎  Prerelease updates detected:');

  if (!hasMajor && !hasMinor && !hasPrerelease) {
    console.log('✅ Dependency health check: no major or minor upgrades available.');
    return;
  }

  if (hasMajor) {
    process.exitCode = 1;
  }
})();
