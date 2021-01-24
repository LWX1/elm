let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/elm");
let db = mongoose.connection;
db.once('open',()=>{
    console.log("数据库连接成功")
});

let schema = mongoose.Schema({
    user:String,
    password:String,
    tel:String
});
let user = mongoose.model('user',schema,collection='user');
// 3. 向外暴露
module.exports = {
    getModel(user) {
        return mongoose.model(user)
    }
}

