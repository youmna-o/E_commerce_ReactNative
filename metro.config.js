const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for Nitro Modules
config.resolver.sourceExts.push('nitro.ts');

// Add the Fawry SDK to watchFolders if needed
config.watchFolders = [
  path.resolve(__dirname, 'node_modules/@fawry_pay/rn-fawry-pay-sdk'),
];

// Configure transformer for .tsx files
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
