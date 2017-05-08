var express = require('express')
var api = require('../controllers/blogController')
var router = express.Router();

router.get('/', api.getAllBlog)
router.get('/:id', api.getSingleBlog)
router.post('/', api.insertBlog)
router.put('/:id', api.updateBlog)
router.delete('/:id', api.removeBlog)




module.exports = router
