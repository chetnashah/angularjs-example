var uuid = require('uuid');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./.aws/config.json');
// create unique bucket name
var bucketName = 'node-sdk-sample' + uuid.v4();

var keyName = 'hello_world.txt';

var bucketPromise = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'ap-south-1'
}).createBucket({
    Bucket: bucketName
}).promise();

bucketPromise.then(function(data){
    var objectParams = {
        Bucket: bucketName,
        Key: keyName,
        Body: 'Hello world!\n'
    };
    // create upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01', region: 'ap-south-1'})
                                    .putObject(objectParams).promise();

    uploadPromise.then(function(data){
        console.log('successfully uploaded data to '+ bucketName + '/' + keyName);
    });
}).catch(function(err){
    console.error(err, err.stack);
});


