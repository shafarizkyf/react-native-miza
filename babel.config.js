module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src', './assets'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@images': './assets/images',
          '@svg': './assets/svg',
          '@components': './src/components',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
