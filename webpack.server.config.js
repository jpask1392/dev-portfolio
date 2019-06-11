const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: __dirname,
  node: {
    __dirname: true,
    __filename: true
  },
  target: 'node',
  entry: ['babel-polyfill', './server/server.js'],
  output: {
    path: path.join(__dirname, "build"),
    // THIS FILENAME GETS CALLED WITHIN INDEX.HTML
    filename: 'server.js',
    publicPath: '/'
  },
  externals: [nodeExternals()],
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