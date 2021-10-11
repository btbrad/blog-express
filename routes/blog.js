var express = require('express')
var router = express.Router()

const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', function (req, res, next) {
  const { author, keyword } = req.query
  // const list = getList(author, keyword)
  // return new SuccessModel(list)
  getList(author, keyword).then((data) => {
    res.json(new SuccessModel(data))
  })
})

router.get('/detail', function (req, res, next) {
  res.json({
    errno: 0,
    data: 'OK',
  })
})

module.exports = router
