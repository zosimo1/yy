var express = require('express');
var path = require('path')
var app = express();
var session = require('express-session');
var router = require('./models/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(session({ secret: 'abddd' }));
var bodyp = require('body-parser');
app.use(bodyp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
router(app);
app.listen(1235)






