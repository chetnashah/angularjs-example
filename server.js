var app = require('express')();
var express = require('express');

app.use(express.static(__dirname));

app.get('*',function(req, res){
    return res.sendFile(__dirname + '/index.html');
});

app.listen(4000);
