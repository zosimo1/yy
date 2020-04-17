var multer = require('multer');
var upload = multer({ dest: 'public/textimages/' })
var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './public/textimages/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
module.exports =upload