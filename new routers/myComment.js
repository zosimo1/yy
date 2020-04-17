var myComment = require('express').Router();
var blogComment = require('../models/database').blogComment;
var stuModelText = require('../models/database').text;

//发出的评论
myComment.get('/', function (req, res) {
    res.locals.user = req.session.user;
    blogComment.find({author:res.locals.user.id}).populate("text author").exec(function(err,qwe){
        res.render('myComment',{"qwe":qwe})
    })
});
//收到的评论
myComment.post('/received', function (req, res) {
    blogComment.find({tname:req.body.id}).populate("author text").exec(function(err,qee){       
        res.send(qee)
})
});
//评论删除
myComment.get('/del/:id',function(req,res){
    blogComment.deleteOne({_id:req.params.id},function(err){
        res.redirect('/myComment');
    })
})
//收到的评论

module.exports = myComment;