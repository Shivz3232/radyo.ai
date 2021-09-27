const path = require('path');

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'styles')],
    prependData: `@import "variables.scss";`,
  },
};
