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
  
  // Test GET method
  it('should list blog posts on GET', function() {
    
    // Run test
    return chai
      .request(app)
      .get('/blog-posts')
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        
        // Confirm there are posts
        expect(res.body.length).to.be.at.least(1);
        
        //Confirm each object has the correct keys
        const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
        res.body.forEach(function(post){
          expect(post).to.be.a('object');
          expect(post).to.include.keys(expectedKeys);
        });
      });
  });
  
  // Test GET /:id method
  
  // Test POST method
  
  // Test PUT method
  
  // Test DELETE method
  
  
})