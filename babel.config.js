module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@types': './src/types',
            '@utils': './src/utils',
            '@store': './src/store',
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@screens': './src/screens',
            '@services': './src/services',
            '@containers': './src/containers',
            '@components': './src/components',
            '@navigators': './src/navigators',
          },
        },
      ],
    ],
  };
};
