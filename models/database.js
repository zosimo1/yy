var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pubic');
var db = mongoose.connection;
db.on('error', function () {
    console.log('链接失败')
})
db.once('open', function () {
    console.log('open')
});
var stuSchema = mongoose.Schema({
    uname: String,
    password: String,
    img: String,
    bname:String,
}, { collection: 'pubic' });
var stuModel = mongoose.model('pubic', stuSchema);

var text = mongoose.Schema({
    title: String,
    text: String,
    img: String,
    blogName: String,
    blogImg:String,
    num:Number,
    author:{type: mongoose.Schema.Types.ObjectId,ref:'pubic'},
    times:String,
    time:String,
}, { collection: 'text' });
var text = mongoose.model('text', text);

var blogComment = mongoose.Schema({
    tname:String,
    comment: String,
    times:String,
    time:String,
    author:{type: mongoose.Schema.Types.ObjectId,ref:'pubic'},
	text:{type: mongoose.Schema.Types.ObjectId,ref:'text'},
}, { collection: 'blogComment' });
var blogComment = mongoose.model('blogComment', blogComment);

var replies = mongoose.Schema({
    reply:String,
    times:String,
    time:String,
    blogComment:{type: mongoose.Schema.Types.ObjectId,ref:'blogComment'},
    author:{type: mongoose.Schema.Types.ObjectId,ref:'pubic'},
}, { collection: 'reply' });
var reply = mongoose.model('reply', replies);

module.exports = { stuModel, text, blogComment,reply };