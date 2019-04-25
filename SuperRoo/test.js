var http = require('http');
var express = require('express');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var app = express();





app.post('/sms',function (req,res) {
    var twiml = new MessagingResponse();
    twiml.message('heyyyyyyyyyy');
    res.writeHead(200,{'Content-Type':'text/xml'})
    res.end(twiml.toString())
})
http.createServer(app).listen(3000,function () {
    console.log('Listening on port 3000')
})