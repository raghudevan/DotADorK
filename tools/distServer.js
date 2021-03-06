// This file configures a web server for testing the production build
// on your local machine.

import express from 'express';
import bodyParser from 'body-parser';
// import historyApiFallback from 'express-history-api-fallback';

import { router } from '../server/serviceLayer/service';
import initSocketServer from '../server/serviceLayer/socketservices';

let app = express();
app.use(bodyParser.json());
app.use('/', router);
// Run express and use middleware for Hot Module Replacement
// app.use(historyApiFallback(__dirname + '../dist/index.html'));

app.use(express.static(process.cwd() + "/dist"));

let server = 
app.listen(3000, function(err) {
  if(err) {
    return;
  }

  initSocketServer(server);
  console.log("Server started on: http://localhost:3000"); //eslint-disable-line no-console
});