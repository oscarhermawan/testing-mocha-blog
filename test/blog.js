var chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const should = chai.should()
var server = require('../app')
var Blog = require('../models/blog')

describe('Blog', ()=>{
  //CREATE SEBELUM TEST
  beforeEach((done) =>{
    var newBlog = new Blog({
      "title" : "Garuda di dadaku, garuda kebanggaanku",
      "content" : "You are The Best lah pokoknya",
      "author" : "James Franklyn"
    })
    newBlog.save((err, blog)=>{
      done()
    })
  })

  //DELETE SETELAH CEK
  afterEach((done)=>{
    Blog.remove({}, (err)=>{
      done()
    })
  })

  //TEST GET
  describe('GET - all blog', () =>{
    it('should get all blog', (done) =>{
      chai.request(server)
      .get('/api/blog')
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('array')
        result.body.length.should.equal(1)
        done()
      })
    })
  })


  //POST
  describe('POST a blog', () =>{
    it('Title, Content should minimum length 10 on /api/blog POST', function(done) {
    chai.request(server)
      .post('/api/blog')
      .send({'title': 'Transaformer dark moon', 'content': 'Cerita tentang transformer', 'author':'Dota 2'})
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
  })

  describe('POST a blog', () =>{
    it('should delete a SINGLE blog on /api/blog/<id> DELETE', function(done) {
      chai.request(server)
        .get('/api/blog')
        .end(function(err, res){
          // console.log(res.body[0]._id);
          chai.request(server)
            .delete('/api/blog/'+res.body[0]._id)
            .end(function(error, response){
              console.log(response.body);
              response.should.have.status(200);
              response.should.be.json;
              response.body.should.be.a('object');
              done();
          });
        });
    });
  })

})
