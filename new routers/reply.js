var reply = require('../models/database').reply;
var replies = require('express').Router();
var blogComment = require('../models/database').blogComment;
replies.post('/', function (req, res) {
    reply.find({ blogComment: req.body.e }).populate({
        path:"blogComment author",
        populate:{
            path:"author"
        }
}).exec(function (err, aaa) {
        res.send(aaa);
    })
})

replies.post('/replies', function (req, res) {
    blogComment.findById(req.body.blogComment).populate('author').exec(function (err, aaab) {
        var t = new Date();
        var ti = t.getFullYear() + '年' + (t.getMonth() + 1) + '月' + t.getDate() + '日' + t.getHours() + ':' + t.getMinutes()
        var replytText = new reply({
            times: ti,
            reply: req.body.reply,
            time: Date.now(),
            blogComment: req.body.blogComment,
            author: req.session.user.id,
        });
        var replytT = {
            rname:aaab.author.bname,
            times: ti,
            reply: req.body.reply,
            name: req.session.user.name,
            img: req.session.user.img
        }
        replytText.save(function (err) {
        })
        res.send(replytT)
    })
})

module.exports = replies; 