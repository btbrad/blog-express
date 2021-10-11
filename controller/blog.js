const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  console.log('sql', sql)

  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then((rows) => {
    return rows[0]
  })
}

const createBlog = (blogData = {}) => {
  const { title, content, author } = blogData
  title = xss(title)
  content = xss(content)
  author = xss(author)
  const sql = `
    insert into blogs (title, content, createtime, author)
    values('${title}', '${content}', ${Date.now()}, '${author}')
  `
  console.log(sql)
  return exec(sql).then((res) => {
    console.log(res)
    return {
      id: res.insertId,
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  return exec(sql).then((res) => {
    console.log(res)
    if (res.affectedRows > 0) {
      return true
    }
    return false
  })
}

const deleteBlog = (id, author) => {
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `
  return exec(sql).then((res) => {
    console.log(res)
    if (res.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
}
