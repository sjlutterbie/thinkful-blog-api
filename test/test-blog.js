// Load testing tools
const chai = require('chai');
const chaiHttp = require('chai-http');

// Load items for running server
const {app, runServer, closeServer} = require('../server');

// Simplify use of chai expect
const expect = chai.expect;

// Load HTTP testing into Chai
chai.use(chaiHttp);

// Test '/blog-posts' operations
describe('Blog posts', function() {
  
  // Start server before running tests
  before(function() {
    return runServer();
  });
  
  // Close server after running tests
  after(function() {
    return closeServer();
  });
  
  
  
  
})