const path = require('path');

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'styles')],
    prependData: `@import "variables.scss";`,
  },
};
