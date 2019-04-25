var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 3000

app.listen(port, function() {
    console.log('Example app listening on port',port);
})

app.get('/hi',function (req,res) {
    res.send('Hello world');
})



module.exports = app;
/*

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "siri1206",
    database:"superroo"
});


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM students", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
*/


const accountSid = 'ACf53265915a45ad5032258b6fb901f2f1';
const authToken = 'a98ea8b9d188f3486077ee2949f64836';

// require the Twilio module and create a REST client
/*const client = require('twilio')(accountSid, authToken);

client.messages.create(
    {
        to: '+18166633758',
        from: '+12762182946',
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    },function(err,msg){
        if(err)
            console.log(err);
        else
            console.log(msg);

    });*/


var TMClient = require('textmagic-rest-client');

var c = new TMClient('nagasirishasunkara', 'RBF3mZm4S15LLQYATKovUeaPtdBYMf');
/*c.Messages.send({text: 'test message', phones:'+14253657616'}, function(err, res){
    //console.log('Messages.send()', err, res);
});*/
app.get('/api/v2/replies',function (req,res) {
    console.log('sirishaaaaaaaaaaa');
    res.send('hi sirisha');
})




