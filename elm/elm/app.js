var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');
const ajax = require('./api/ajax')
const session = require('express-session');
const indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 解决post
// 处理json格式的参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 解决跨域问题
// app.all("*", function(req, res, next) {
//   if (!req.get("Origin")) return next();
//   // use "*" here to accept any origin
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Methods", "GET");
//   res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//   // res.set('Access-Control-Allow-Max-Age', 3600);
//   if ("OPTIONS" === req.method) return res.send(200);
//   next();
// });


// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置模板路径
// app.set('view engine', 'jade');
app.engine('html', require("ejs").__express); // 加载引擎模板
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/static', express.static('public'))  http://localhost:3000/static/images/kitten.jpg

// 解决session问题
app.use(session({
  secret: '12345',
  cookie: {maxAge: 1000*60*60*24 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true
}));

// app.use(session({
//   secret :  '12345', // 对session id 相关的cookie 进行签名
//   name: 'elm',
//   resave : false,
//   saveUninitialized: true, // 是否保存未初始化的会话
//   cookie : {
//     maxAge : 1000*60*60*24, // 设置 session 的有效时间，单位毫秒
//   },
// }));

// 启动路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
