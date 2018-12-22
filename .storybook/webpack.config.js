const path = require('path');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push(
    { test: /\.(ts|tsx)$/, loader: require.resolve('awesome-typescript-loader') },
    {
      test: /\.stories\.tsx?$/,
      loader: [{
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' }
      }],
      enforce: 'pre',
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
