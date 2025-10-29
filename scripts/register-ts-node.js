/* eslint-disable @typescript-eslint/no-var-requires */

const existingOptions = process.env.TS_NODE_COMPILER_OPTIONS ? JSON.parse(process.env.TS_NODE_COMPILER_OPTIONS) : {};

process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({
  module: 'nodenext',
  moduleResolution: 'nodenext',
  allowImportingTsExtensions: true,
  ...existingOptions,
});

require('ts-node/register');
