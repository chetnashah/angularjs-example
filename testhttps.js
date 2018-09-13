var https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    const options = {
        hostname: url,
        port: 443,
        path: '/',
        method: 'GET',
        rejectUnauthorized: false
      };
      
    https
      .get(url, options, res => {
        let body = "";
        res.on("data", chunk => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });
}

// get('https://www.google.com');

var http = require('http');
http.createServer((req, res) => {
    console.log('hello world');
    get('https://encrypted.google.com:443');
    res.statusCode = 200;
    res.write("DOne!");
    res.end();
}).listen(4000);


