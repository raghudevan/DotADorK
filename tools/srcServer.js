// This file configures the development web server
// which supports hot reloading and synchronized testing.

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'express-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

let app = express();
const bundler = webpack(config);
const middleware = webpackDevMiddleware(bundler, {

  // Dev middleware can't access config, so we provide publicPath
  publicPath: config.output.publicPath,

  // pretty colored output
  stats: { colors: true },

  // Set to false to display a list of each file that is being bundled.
  noInfo: true

  // for other settings see
  // http://webpack.github.io/docs/webpack-dev-middleware.html
});

app.use(bodyParser.json());
// Run express and use middleware for Hot Module Replacement
app.use(historyApiFallback(__dirname + '../src/index.html'));
app.use(middleware);
app.use(webpackHotMiddleware(bundler));

app.get('/', function(req, res, next) {
  if(req.url == "/") {
    res.sendFile(path.join(__dirname, '../src/index.html'));
    return;
  }

  next();
});

// let server = 
app.listen(3000, function(err) {
  if(err) {
    return;
  }

  console.log("Server started on: http://localhost:3000"); //eslint-disable-line no-console
});
