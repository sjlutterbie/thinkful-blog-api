'use strict';

// Load required packages
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Load model
const {BlogPosts} = require('./models');

// Create initial blog articles
  BlogPosts.create(
    "My first blog article",
    "Wow, this is really exciting to be writing a blog article directly into volatile memory.",
    "Mr. Hyde",
    "2018-09-20"
  );
  BlogPosts.create(
    "My second blog article",
    "Well, now the initial thrill has worn off. Beginning to think storing"
    + "blog posts into volatile memory isn't a great long-term strategy.",
    "Dr. Jekyll",
    "2018-09-21"
  );
  
// Routes

router.get('/', (req, res) => {
  
  const message = "GET request received. Full functionality to be implemented.";
  console.log(message);
  res.send(message);
  
});

router.post('/', (req, res) => {
  
  const message = "POST request received. Full functionality to be implemented.";
  console.log(message);
  res.send(message);
  
});

router.put('/:id', (req, res) => {
  
  const message = "PUT request received. Full functionality to be implemented.";
  console.log(message);
  res.send(message);
  
});

router.delete('/:id', (req, res) => {
  
  const message = "DELETE request received. Full functionality to be implemented.";
  console.log(message);
  res.send(message);

});

module.exports = router;