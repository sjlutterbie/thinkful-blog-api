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
  // Strategy:
  // 1. Make GET request to /blog-posts
  // 2. Examine response object for:
  //    - Correct status code
  //    - Object(s) with correct keys
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
  // Strategy:
  // 1. Use GET request to return valid ID (and blog post object)
  // 2. Send Get /:id request using valid ID
  // 3. Examine response object for:
  //    - Correct status code
  //    - Matching object
  it('should return a specific post on GET /:id', function() {
    
    // Initiate blog post from initial GET
    let blogPost = {};
    
    return(
      chai
        .request(app)
        // Get ID of object to request
        .get('/blog-posts')
        .then(function(res) {
          // Store the initial blog post
          blogPost = res.body[0];
          // Run the test
          return chai
            .request(app)
            .get(`/blog-posts/${res.body[0].id}`);
        })
        .then(function(res){
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal(blogPost);
        })
    );
  });
  
  // Test POST method
  // Strategy:
  // 1. Make a POST request to /recipes with a new item
  // 2. Examine the response object for:
  //    - Correct status code
  //    - The submitted object, plus an id
  it('should add an blog-post on POST', function() {
    
    // Create new item
    const newPost = {
      title: "Test blog post",
      content: "Test blog content",
      author: "Testy McTesterFace",
      publishDate: "Testy McTesterDate"
    };
    
    const expectedKeys = ['id', 'title', 'author', 'content', 'publishDate'];
    
    // Run test
    return chai
      .request(app)
      .post('/blog-posts')
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys(expectedKeys);
        expect(res.body).to.not.equal('null');
        // Confirm it's returning the same post, with its new iD
        expect(res.body).to.deep.equal(
          Object.assign(newPost, {id: res.body.id})
        );
      });
  });
  
  // Test PUT method
  // Strategy:
  // 1. Create some data with which to edit a blog post
  // 2. Send a GET request to collect a valid ID to edit
  // 3. Add the ID to the edit data
  // 4. Make PUT request with the edit data
  // 5. Examind the response object for:
  //    - Correct status code
  //    - The updated blog post
  it('should update a blog post on PUT', function() {
    
    // Create updatePost object
    const updatePost = {
      title: "New test title",
      content: "New test content",
      author: "Testy McTesterFace, Jr."
    };
    
    // Run test
    return (
      chai
        .request(app)
        // Get ID of post to edit
        .get('/blog-posts')
        .then(function(res) {
          updatePost.id = res.body[0].id;
          
          //Send PUT to edit post
          return chai
            .request(app)
            .put(`/blog-posts/${updatePost.id}`)
            .send(updatePost);
        })
        .then(function(res) {
          // Example PUT response
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal(updatePost);
        })
    );
  });
  
  // Test DELETE method
  
  
})