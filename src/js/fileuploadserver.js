var express = require('express');
var app = express();
var multer = require('multer');

app.get('/', (req, res) => res.status('200').send('success'));

var upload = multer({ dest: 'uploads/'});

// 'avatar` is name of the field in form submission
app.post('/postinfo', upload.single('avatar'), (req, res, next)=> {
    console.log('following multer middleware, ');
    console.log('req.file = ', req.file);
    console.log(req.file);
    return res.send(req.body);
});

app.listen(8001, () => {
    console.log('listening!');
});

