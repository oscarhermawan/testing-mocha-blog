const mongoose = require('mongoose');
var Schema = mongoose.Schema

var blogSchema = new Schema({
  title:{
    type:String,
    minlength:10,
    required: true
  },
  content:{
    type:String,
    minlength:10,
    required: true
  },
  author:{
    type:String,
    required: true
  }
}, {
  timestamps: true
})

var Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
