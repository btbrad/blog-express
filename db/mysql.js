const mysql = require('mysql2')
const { MYSQL_CONF } = require('../config/db')

// 创建了链接对象
console.log(1111, MYSQL_CONF)
console.log(process.env.NODE_ENV)
const conn = mysql.createConnection(MYSQL_CONF)

// 开始链接
conn.connect()

// 执行sql语句
function exec(sql) {
  return new Promise((resolve, reject) => {
    conn.query(sql, (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape,
}
