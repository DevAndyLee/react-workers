const path = require('path');

module.exports = {
  mode: 'development',
  entry: './worker/worker.js',
  output: {
    path: path.resolve(__dirname, '../public/worker'),
    filename: 'web-worker.js'
  },
  target: 'webworker',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  }
};
