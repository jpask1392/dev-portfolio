const path = require('path');

module.exports = {
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 100,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    proxy: {
      '*': 'http://localhost:9000'
    }
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