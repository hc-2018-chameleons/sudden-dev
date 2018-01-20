var baseDir = __dirname + '/core/static/js';

module.exports = {
  context: baseDir + '/src',
  entry: {
    app: './app.js',
  },
  output: {
    path: baseDir + '/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
