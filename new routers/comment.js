var comment = require('express').Router();
var stuModelText = require('../models/database').text;
var blogComment = require('../models/database').blogComment;

comment.get('/',function(req,res){
    res.locals.user = req.session.user;
    stuModelText.find({author:res.locals.user.id},function(err,bq){
        res.render('comment',{"bq":bq})
    })
})
comment.get('/del/:id',function(req,res){
    stuModelText.deleteOne({_id:req.params.id},function(err){       
        var pl={
            __v:1
        }
        console.log(req.params.id);
        blogComment.update({text:req.params.id},pl,function(err){
            res.redirect('/comment');
        })
    })
})
module.exports = comment;