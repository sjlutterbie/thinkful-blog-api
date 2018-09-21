'use strict';

// Load required packages
const express = require('express');
const morgan = require('morgan');

// Initiate app
const app = express();

// Log the HTTP layer
app.use(morga('common'));

// Identify public files
app.use(express.static('public'));

















// Launch app
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});