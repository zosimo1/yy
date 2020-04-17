var reg = require('../new routers/reg');
var login = require('../new routers/login');
var text = require('../new routers/text');
var myComment = require('../new routers/myComment');
var comment = require('../new routers/comment');
var add = require('../new routers/add');
var reply = require('../new routers/reply');

module.exports = function (app) {
    //主页路由
    app.use('/', reg);
    //注册界面验证
    app.use('/login', login);
    //我的评论
    app.use('/myComment', myComment);
    //发布文章
    app.use('/text', text);
    //个人主页
    app.use('/comment', comment);
    //评论
    app.use('/add', add);
    //回复
    app.use('/reply', reply)
    //注册页面
    app.get('/reg', function (req, res) {
        res.render('index');
    })
    //忘记密码
    app.get('/forget',function(req,res){
        res.render('forget');
    })
    //退出登录
    app.get('/reb', function (req, res) {
        req.session.user = null;
        res.redirect('/');
    })
}

