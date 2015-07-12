
module.exports = {

  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: __dirname
  },

  module: {
    loaders: [
      { test: /(\.js$|\.jsx?$)/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!cssnext-loader' }
    ]
  },

  cssnext: {
    compress: true,
    features: {
      customProperties: {
        variables: {
          blue: '#0cf'
        }
      }
    }
  }

}

