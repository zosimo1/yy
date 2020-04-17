var router1 = require('express').Router();
var stuModel = require('../models/database').stuModel;
var upload = require('../models/upload');
var crypto = require('crypto');
//注册账号
router1.post('/', upload.single('img'), function (req, res) {
    var md5 = crypto.createHash("md5").update(req.body.password).digest('hex');
    var stu = new stuModel({
        uname: req.body.uname,
        bname : req.body.bname,
        password: md5,
        img: req.file && req.file.originalname||"img_2.jpg",
    })

    stuModel.find({ uname: stu.uname }, function (err, use) {
        if (use.length > 0) {
            res.send('注册名字重复')
        } else {
            stu.save(function (err) {
                req.session.user = { name: stu.bname, img: stu.img ,id:stu.id}
                res.redirect('/');
            })
        }
    })
})
//修改密码
router1.post('/forget',function(req,res){
     var md5 = crypto.createHash("md5").update(req.body.password).digest('hex');
    var yh={
        uname: req.body.uname,
        bname : req.body.bname,
    }
    var pw = {
        password:md5
    }
    stuModel.find(yh,function(err,us){   
        if(us.length > 0){
            stuModel.findByIdAndUpdate(us[0].id,pw,function(err){
            }) 
            req.session.user={
                name:us[0].bname,
                img:us[0].img,
                id:us[0]._id
            }
            res.redirect('/');
        }else{
            res.send("用户名或者注册邮箱有误");
        }
    })
})
//登录
router1.post('/enter', function (req, res) {
    var md5 = crypto.createHash("md5").update(req.body.password).digest('hex');
    var eq = {
         uname: req.body.name, password: md5
        };        
    stuModel.find(eq,function(err,us){   
        if(us.length > 0){
            req.session.user={
                name:us[0].bname,
                img:us[0].img,
                id:us[0]._id
            }
            res.redirect(req.body.tt);
        }else{
            res.redirect(req.body.tt);
        }
    })
});

module.exports = router1
