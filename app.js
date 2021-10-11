var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express()

/**
 * 暂时用不到模板引擎
 */
// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))

/**
 * 把post请求的数据（json/formdata）转存到req.body中
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

const redisClient = require('./db/redis.js')
const sessionStore = new RedisStore({
  client: redisClient,
})
app.use(
  session({
    secret: 'Bjs#4545_',
    cookie: {
      path: '/', // 默认配置
      httpOnly: true, // 默认配置
      maxAge: 3600 * 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  })
)

// 处理静态文件，暂时用不到
// app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter)
// app.use('/users', usersRouter)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
