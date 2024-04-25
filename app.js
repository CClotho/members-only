const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const passport = require('passport');



require('dotenv').config()

const app = express();

mongoose.set("strictQuery", false);

// Connect MongoDB
const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
}
main().catch((err) => console.log(err), console.log("connected")) 

const store = new MongoStore({
  client: mongoose.connection.getClient()
})

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1800000},
  store: store
}))

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* app.use((req, res, next)=> {

  res.locals.user= req.user;
  next();
})
 */
app.use('/', indexRouter); // --> Visitors --> Sign Up --> Login


app.use('/user', usersRouter); 


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
  console.error(err.stack)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
