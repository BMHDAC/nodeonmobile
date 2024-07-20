const path = require('path');
module.exports = {
  mode: 'production',
  entry: './client_web/index.js',
  output: {path: path.resolve(__dirname, 'dist'), filename: 'index.js'},
};