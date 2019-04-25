var express = require('express');
var cors = require('cors');
var app = express();
var cron = require('node-cron');
//const bodyParser= require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));

const port = 3000
var MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(cors());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, function() {
    console.log('Example app listening on port',port);
})


var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "siri1206",
    database:"superroo"
});


app.get('/',function (req,res) {
    res.sendFile(__dirname + '/testindex.html');
})
app.get('/doctors',function (req,res) {
        con.query("SELECT *,rating FROM doctors", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
})

app.post('/makeAppointment', function(req, res){
    console.log(req.body);
    var appointmentData = req.body;
        var sql = "INSERT INTO appointments (doc_name,patient_name,patient_phn_num,relation,start_time,end_time) VALUES ?";
        var values = [[appointmentData.doc_name,appointmentData.patient_name,appointmentData.patient_phn_num,appointmentData.relation,appointmentData.start_time,appointmentData.end_time]];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    res.status(200).send({success:true,message:"saved to database"})
})



/*
var task = cron.schedule('* * * * *', function()   {
    console.log('will execute every minute until stopped');
});
*/

//task.stop();
var TMClient = require('textmagic-rest-client');

var c = new TMClient('vinaysanthosham', 'OZMEmmmZ7YV65bioI9iZQf2k1zEYaQ');
c.Messages.send({text: 'test message', phones:'+19132576976'}, function(err, res){
    console.log('Messages.send()', err, res);
});
app.post('/api/v2/replies',function (req,res) {
    console.log('request:',req.body);
    //console.log('response:',res);
    res.send(req.body);
});

/*

const accountSid = 'ACfbe36e923e31cec7558386ce0b8d33c0';
const authToken = 'c80297c19e25f50ede129cf730e3427f';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages.create(
    {
        to: '+19132576976',
        from: '+16203749149',
        body: 'Helloooo',
    },function(err,msg){
        if(err)
            console.log(err);
        else
            console.log(msg);

    });
app.post('/sms', function(req, res) {
    var twiml = new MessagingResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

*/
