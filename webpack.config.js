
var webpack = require('webpack')
var path = require('path')

module.exports = {

  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './entry.js'
  ],

  output: {
    filename: 'bundle.js',
    path: __dirname
  },

  module: {
    loaders: [
      { test: /(\.js$|\.jsx?$)/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
      { test: /\.js$/, include: path.resolve(__dirname, './node_modules/blk/node_modules/jxnblk-avatar/src'), loaders: ['babel'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!cssnext-loader' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    hot: true
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

