const bodyParser = require('body-parser');
const database = require("./database/config")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer')
var forms = multer();
var cors = require('cors');
const authMiddleware = require('./middleware/auth');


// use it before all route definitions

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tablesRouter = require('./routes/tables');
var authRouter = require('./routes/auth');
var mailRouter = require('./routes/mail');

var app = express();
app.use(bodyParser.urlencoded());

app.use(cors())
app.use(bodyParser.json());
app.use(forms.array()); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/', usersRouter);
app.use('/api/v1/', tablesRouter);
app.use('/api/v1/', authRouter);
app.use('/api/v1/', mailRouter);

const port = 3000;
app.listen(port)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
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


