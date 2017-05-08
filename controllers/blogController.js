var Blog = require('../models/blog')
var ObjectId = require('mongodb').ObjectId
const methods = {}

methods.getAllBlog = function(req, res){
  Blog.find(function(err, result) {
    if(err){
      console.log(err);
    } else {
      res.send(result)
    }
  })
}

methods.getSingleBlog = function(req, res){
  Blog.findById(req.params.id, function(err, result) {
    if(err){
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

methods.insertBlog = function(req, res){
  var blogInput = new Blog({
    title:req.body.title,
    content:req.body.content,
    author:req.body.author
  })
  blogInput.save(function(err,blogInput){
    if(err){
      res.status(400).send(err);
    } else {
      res.send(blogInput)
    }
  })
}

methods.updateBlog = function(req,res){
  Blog.findById(req.params.id, function(err, result){
    if(!err){
      var updateBlog = new Blog({
        title:req.body.title || result.title,
        content:req.body.content || result.content,
        author:req.body.author || result.author
      })

      Blog.findByIdAndUpdate(req.params.id, updateBlog, {new:true}, function(err, result){
        if(!err){
          res.send(result)
        } else {
          res.send(err)
        }
      })
    } else {
      res.send(err)
    }
  })
}

methods.insertBlog = function(req, res){
  var blogInput = new Blog({
    title:req.body.title,
    content:req.body.content,
    author:req.body.author
  })
  blogInput.save(function(err,blogInput){
    if(err){
      res.status(400).send(err);
    } else {
      res.send(blogInput)
    }
  })
}


methods.removeBlog = function(req,res) {
  Blog.findByIdAndRemove(req.params.id, function(err, result){
    if(!err){
      res.send(result)
    } else {
      res.send(err)
    }
  })
}


module.exports = methods
