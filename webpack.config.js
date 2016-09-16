var path = require('path');

module.exports = {

  context: path.join(__dirname, './src'),

  entry: './main',

  output: {

    filename: 'bundle.js',

    path: path.join(__dirname, './dist')

  },

  resolve: {

    extensions: ['', '.js', '.jsx']

  },

  devtool: '#inline-source-map',

  module: {

    loaders: [

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }

    ]

  }

};
