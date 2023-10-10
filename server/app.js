var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
//var indexRouter = require('./routes/index');
var Tail = require('tail').Tail;
var alertsRouter = require('./routes/alerts');
var alertsAllRouter = require('./routes/alertsAll');
var perfRouter = require('./routes/perf');
var app = express();
var io = require('socket.io')(app.listen(3003), {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  console.log('client connect');
});
const tail = new Tail('/var/log/snort/appid.json')
tail.on('line', function(data) {     
  json = JSON.parse(data)
  io.sockets.emit('json', json)
});
tail.on('error', error => console.log(error))

app.use("/alerts", alertsRouter);
app.use("/alerts_all", alertsAllRouter);
app.use('/perf',perfRouter)
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

module.exports = app;
