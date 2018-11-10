var app = require('express')();
var express = require('express');

app.use(express.static('build'));
app.get('*',function(req, res){
    return res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000);
