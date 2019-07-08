// custom dependencies 
import routes from './api/routes/routes';
var history = require('connect-history-api-fallback');

// dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const proxy = require('proxy-middleware');

// RUNNING WEBPACK DEV FROM SAME SERVER
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('./webpack.config.js');
// const compiler = webpack(config);
// 8081

// variables
const PORT = process.env.PORT || 9000;
console.log(PORT)
// const server = '127.0.0.1:27017';
// const database = 'learning_mongodb';

// const n = __dirname.indexOf("server")
// const rootDirectory = `.${__dirname}`

// .slice(0, n)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackDevMiddleware(compiler, {
// 	hot: true,
//   	publicPath: config.output.publicPath
// }));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// routes function 
routes(app);

// use() for serving static files
app.use(history());
app.use('/assets', express.static('assets'));
app.use('/build', express.static('build'));
app.use(function (req, res, next) {
  res.status(404).sendFile(path.resolve("./public/index.html"))
})

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + "/public/index.html");
// })


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})


