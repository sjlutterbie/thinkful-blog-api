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
  // Get list of all blog posts
  res.json(BlogPosts.get());
});

router.get('/:id', (req, res) => {
  // Get a specific blog post

  const message = `GET request for post \`${req.params.id}\` received. Full functionality to be implemented.`;
  console.log(message);
  res.send(message);  

});


router.post('/', jsonParser, (req, res) => {
  
  // Ensure required fields exist
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      res.status(400).send(message);
    }
  }
  
  // Create blog post
  const post = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author,
    req.body.publishDate);
  
  // Return success status and blog post JSON
  res.status(201).json(post);

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