const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const blog = require('./routes/blog')
const cors = require('cors')


var db_config = {
  development: 'mongodb://localhost/blog',
  test: 'mongodb://localhost/blog-test'
}


app.use(cors())
var app_env = app.settings.env
console.log('-- app env', app_env);
mongoose.connect(db_config[app_env], function(err, res){
  console.log('connected to DB ' +db_config[app_env]);
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/blog', blog)

app.listen(3000)

module.exports = app
