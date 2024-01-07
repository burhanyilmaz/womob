module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@screens': './src/screens',
            '@components': './src/components',
            '@navigators': './src/navigators',
          },
        },
      ],
    ],
  };
};
