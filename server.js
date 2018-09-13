console.log('index.js');

setInterval(function myfn(){
    console.log('Here I am logging stuff');
}, 250);

var http = require('http');
var fs = require('fs');
var server = http.createServer(function myHandler(req, res) {
    console.log('serving a request, req.url = ', req.url);
    // code is static serving for all get requests
    // if (req.method === 'GET') {
    //     console.log(req.url);
    //     var filename = 'index.html';ss
    //     if (req.url !== '/') {
    //         filename = req.url.replace(/^\//g,'');
    //     }
    //     // res.setHeader('content-type', 'text/html');
    //     fs.createReadStream(filename).pipe(res);
    //     return;
    //
    // }
    // if (req.method === 'POST') {
    //     console.log('req.headers = ', req.headers);
    // }
    res.write('hi world');
    res.end();
}).listen(4000);

