var stuModelText = require('../models/database').text;
var router2 = require('express').Router();
var upload = require('../models/upload');

router2.get('/',function(req,res){
    res.locals.user = req.session.user;
    res.render('newBlogContent')
})
router2.post('/text',upload.single('img'),function(req,res){
    var t = new Date();
    var ti=t.getFullYear() + '年' + (t.getMonth() + 1) + '月' + t.getDate() + '日' + t.getHours() + ':' + t.getMinutes() 
    var blogText =new stuModelText({
        blogName:req.session.user.name,
        blogImg:req.session.user.img,
        text:req.body.text,
        title:req.body.title,
        img:req.file && req.file.originalname||"img_1.jpg",
        time:Date.now(),
        times:ti,
        author:req.session.user.id,
    }) ; 
        blogText.save(function(err,cc){
        res.redirect('/');
    });
})
module.exports = router2;