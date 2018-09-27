'use strict';

// Load required packages
const express = require('express');
const morgan = require('morgan');

// Initiate app
const app = express();

// Log the HTTP layer
app.use(morgan('common'));

// Identify public files
app.use(express.static('public'));

// Initiate Routers
const blogPostRouter = require('./blogPostRouter');
  app.use('/blog-posts',blogPostRouter);

// Set up runServer & closeServer for testing
let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () =>{
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on('error', err =>{
        reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// If this file is called directly, launch the server
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};