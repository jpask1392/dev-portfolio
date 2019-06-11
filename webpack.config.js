const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, "build"),
    // THIS FILENAME GETS CALLED WITHIN INDEX.HTML
    filename: 'bundle-main.js',
    publicPath: '/build'
  },
   devServer: {
    open: 'Google Chrome',
    historyApiFallback: true,
    // IF RUNNING FROM A DIFFERENT SERVER UNCOMMENT THIS CODE
    port: 3000,
    proxy: {
      '*': 'http://localhost:9000'
    }
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 100,
    ignored: /node_modules/
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }       
      , {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "resolve-url-loader",
          "sass-loader"
        ]
      }
    ]
  }
};