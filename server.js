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

// Launch app
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});