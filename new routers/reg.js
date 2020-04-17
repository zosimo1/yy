var stuModelText = require('../models/database').text;
var router = require('express').Router();

//主页
router.get('/', function (req, res) {
    res.locals.user = req.session.user;
    stuModelText.find().populate('author').exec(function(err,cb){
        res.render('gebk',{"cb":cb})
    })
})


module.exports = router;


