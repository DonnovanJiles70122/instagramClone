var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var sessions = require('express-session');
var mysqlSessions = require('express-mysql-session')(sessions);
var flash = require('express-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var dbRouter = require('./routes/dbtest');
var errorPrint = require('./helpers/debug/debugPrinters').errorPrint;
var requestPrint = require('./helpers/debug/debugPrinters').requestPrint;

var app = express();

app.engine(
  "hbs",
  handlebars({
      layoutDir: path.join(__dirname, "views/layouts"),
      partialsDir: path.join(__dirname, "views/partials"),
      extname: ".hbs",
      defaultLayout: "home",
      helpers: {
          emptyObject: (obj) => {
              return !(obj.constructor === Object && Object.keys(obj).length === 0);
          }
          /**
           * if you need more helpers you can
           * register them here
           */
      }
  })
);


var mysqlSessionStore = new mysqlSessions(
    {
        /* using default options */
    },
    require('./config/database')
);

app.use(sessions({
    key: "csid",
    secret: "this is a secret from csc317",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.set("view engine", "hbs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    requestPrint(req.url);
    next();
});

app.use((req, res, next) => {
    console.log(req.session);
    if(req.session.username){
        res.locals.logged = true;
    }
    next();
})

app.use('/', indexRouter);
app.use('/dbtest', dbRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

app.use((err, req, res, next) =>{
    res.status(500);
    res.send('something went wrong with your database');
})

app.use((err, req, res, next) =>{
    console.log(err);
    res.render('error', {err_message: err});
})

module.exports = app;
