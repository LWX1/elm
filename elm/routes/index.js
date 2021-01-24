let svg = require('svg-captcha');
let model = require('../db/db_model');
let UserModel = model.getModel('user')
var express = require('express');
var router = express.Router();
const sms_util = require('../util/sms_util')
const ajax = require('../api/ajax')
const users = {}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',name:'你好'});
});

// 请求 index_category.json数据
router.get("/index_category",function (req, res) {
  setTimeout(function () {
    const data = require('../data/index_category.json');
    res.send({code: 0, data});
  }, 1000)
});

// 请求 index_category.json数据
router.get("/shops",function (req, res) {
  setTimeout(function () {
    const data = require('../data/shops.json');
    res.send({code: 0, data})
  }, 1000)
});

// 生成验证码
router.get("/captcha",function (req, res) {
  var cap = svg.create({color:'green',noise:4,background:'red'});
  req.session.captcha = cap.text.toLowerCase();
  console.log(req.session.captcha)
  res.type('svg');
  res.send(cap.data)
});

// 登录验证
router.post("/login_pwd", (req, res)=> {
  let info = req.body;
  let username = info.username;
  let password = info.password;
  let cap = info.captcha.toLowerCase();
  if(cap !== req.session.captcha)
  {
    return res.send({code: 1, msg: '验证码不正确'})
  }
  delete req.session.captcha;
  UserModel.findOne({username:username}, function (err, userName) {
    if (userName) {
      console.log('findUser', userName)
      if (userName.pwd !== password) {
        res.send({code: 1, msg: '用户名或密码不正确!'})
      }
      else {
          req.session.userid = userName._id
          res.send({code: 0, data: {_id: userName._id, username: userName.user, tel: userName.tel}})
        }
    }
    else {
      const userModel = new UserModel({name, pwd})
      userModel.save(function (err, userName) {
        // 向浏览器端返回cookie(key=value)
        // res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
        req.session.userid = userName._id
        const data = {_id: userName._id, user: userName.user}
        // 3.2. 返回数据(新的user)
        res.send({code: 0, data})
      })
    }
  })
});

// 发送验证码信息
router.get('/sendcode',(req,res)=> {
  let phone = req.query.phone; // 获取手机号码
  console.log(phone)
  let code = sms_util.randomCode(6);
  console.log(`向${phone}发送验证码短信: ${code}`);
  sms_util.sendCode(phone, code, function (success) {//success表示是否成功
    if (success) {
      users[phone] = code
      console.log('保存验证码: ', phone, code)
      res.send({"code": 0})
    } else {
      //3. 返回响应数据
      res.send({"code": 1, msg: '短信验证码发送失败'})
    }
  })
});
router.post('/login_sms', function (req, res, next) {
  var phone = req.body.phone;
  var code = req.body.code;
  console.log('/login_sms', phone, code);
  if (users[phone] != code) {
    res.send({code: 1, msg: '手机号或验证码不正确'});
    return;
  }
  //删除保存的code
  delete users[phone];
  UserModel.findOne({phone}, function (err, user) {
    if (user) {
      req.session.userid = user._id
      res.send({code: 0, data: user})
    } else {
      //存储数据
      const userModel = new UserModel({phone})
      userModel.save(function (err, user) {
        req.session.userid = user._id
        res.send({code: 0, data: user})
      })
    }
  })

});
/*
根据sesion中的userid, 查询对应的user
 */
router.get('/userinfo', function (req, res) {
  // 取出userid
  const userid = req.session.userid
  // 查询
  UserModel.findOne({_id: userid}, function (err, user) {
    // 如果没有, 返回错误提示
    if (!user) {
      // 清除浏览器保存的userid的cookie
      delete req.session.userid

      res.send({code: 1, msg: '请先登陆'})
    } else {
      // 如果有, 返回user
      res.send({code: 0, data: user})
    }
  })
})
/*
根据经纬度获取位置详情
*/
router.get('/position/:geohash', function (req, res) {
  const {geohash} = req.params
  // http://cangdu.org:8001/v2/pois 定位网站
  ajax(`http://cangdu.org:8001/v2/pois/${geohash}`)
      .then(data => {
        res.send({code: 0, data})
      })
})
// 删除登录信息
router.get('/logout', function (req, res) {
  // 清除浏览器保存的userid的cookie
  delete req.session.userid
  // 返回数据
  res.send({code: 0})
})


module.exports = router;
