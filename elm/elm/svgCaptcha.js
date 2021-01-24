let svg = require('svg-captcha');
let fs = require('fs');

// size: 4 // 验证码长度
// ignoreChars: '0o1i' // 验证码字符中排除 0o1i
// noise: 1 // 干扰线条的数量
// color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
// background: '#cc9966' // 验证码图片背景颜色
// let cap = svg.create({color:'green',noise:4,background:'red'});
let cap = svg.createMathExpr({mathMin: 1,mathMax:9,color:'green',noise:4,background:'red'})
console.log(cap);

fs.writeFile("1.svg",cap.data,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("写入成功");
    }
})