var blogComment = require('../models/database').blogComment;
var stuModelText = require('../models/database').text;
var add = require('express').Router();
add.get('/', function (req, res) {
    stuModelText.findById(req.query.id).populate('author').exec(function (err, cb) {
        blogComment.find({ text: cb._id }).populate('author').exec(function (err, us) {
            var cd = {
                cb: cb,
                us: us
            }
            res.send(cd)
        })
    })
})

add.post('/comment', function (req, res) {
    stuModelText.findById(req.body.autuor,function (err, dcb) {
        var t = new Date();
        var ti=t.getFullYear() + '年' + (t.getMonth() + 1) + '月' + t.getDate() + '日' + t.getHours() + ':' + t.getMinutes() 
        var commentText = new blogComment({
            tname: dcb.author,
            comment: req.body.comment,
            times:ti,
            time: Date.now(),
            author: req.session.user.id,
            text: req.body.autuor,
        })
        var comment = {
            commentText: commentText,
            name: req.session.user.name,
            img: req.session.user.img
        }
        blogComment.find({ text: req.body.autuor }, function (err, uu) {
            var num = {
                num: uu.length + 1
            }
            stuModelText.findByIdAndUpdate(req.body.autuor, num, function (err) {
            })
        })
        commentText.save(function (err) {
        })
        res.send(comment)
    })
})
module.exports = add; 
