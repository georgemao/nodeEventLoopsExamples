'use strict'

var AWS = require("aws-sdk");
var https = require('https');
var uuid = require ("uuid");

AWS.config.update({
  region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var ec2Client = new AWS.EC2({apiVersion: '2014-10-01'});
var s3Client = new AWS.S3();

var params = {
    TableName : "Buckets",
    KeyConditionExpression: "#name = :yyyy",
    ExpressionAttributeNames:{
        "#name": "name"
    },
    ExpressionAttributeValues: {
        ":yyyy":"https://www.google.com"
    }
};

function getUrl(URL){
    console.log("Getting..." + URL);
    // purpose: accept a URL and execute it.
    return new Promise(function (fulfill, reject){
   
        https.get(URL, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(data);
            fulfill(data);
        });
      
      }).on("error", (err) => {
        reject(err);
      });
    });
  }

function lookupUrl(){
    return  docClient.query(params).promise();
}

function uploadToS3(data, bucketName, keyName){
    var params = {Bucket: bucketName, Key: keyName, Body: data};
    return s3Client.putObject(params).promise();
}


// Lambda entry point
exports.handler = function (event, context, callback) {
    console.log(JSON.stringify(`Event: event`));

    // Look up the URL from DDB. Returns a promise
    var url = lookupUrl();

    // Waits for the promise, then performs a HTTPS GET on the returned URL, then performs a S3Put object to store the retrieved HTTP object
    var get = url.then(function(resultA) {
        console.log ("Results " + JSON.stringify(resultA));
        return (getUrl(resultA.Items[0].name))
    })
    .then(function (resultB){
        //console.log(resultB);
        return (uploadToS3(resultB, "awsgeorge", uuid.v4() + ".html" ));
    })
    .then(function(resultC){
        console.log(JSON.stringify(resultC));
    })
    .catch(function (err){
        console.log(err);
    });
    

    callback(null, { statusCode: 200 })
}