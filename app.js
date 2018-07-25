var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var registerAppRouter = require('./routes/registerApp');
var createNotificationRouter = require('./routes/createNotification');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//connect to Mongo db using moongoose. This is just the test db..comes with mongoose- no Username and pwd
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Yeah, we are connected")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//listen to beautiful io connections/We may need to check the app api key for connecting. Securit security!
io.on('connection', function (socket) {
  socket.emit('jdfconnected', { message: 'You are connected' });
});

//this is to pass the socket io to the router/controller or whatever java suckers call this! This is beautiful in js
// No shitty stomp from spring...why are java stuffs over complicated? Oh lord, I love JS
app.use(function(req, res, next){
  res.io = io;
  next();
});

//This is declaring our routes and will allow mongo to work
app.use('/', indexRouter);
app.use('/registerApp', registerAppRouter);
app.use('/createNotificationMessage', createNotificationRouter);

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

module.exports = {app: app, server: server};
