const path = require('path');
module.exports = {
  mode: 'production',
  entry: './nodejs-assets/nodejs-project/client_web/index.js',
  output: {
    path: path.resolve('./nodejs-assets/nodejs-project/dist'),
    filename: 'index.js',
  },
};
