var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var dashboard = require("./routes/dashboard");
var baocao = require("./routes/baocao");
var daily = require("./routes/daily");
var hanghoa = require("./routes/hanghoa");
var order = require('./routes/order');
var authentication = require('./routes/authentication');
var account = require('./routes/account');

//ma hoa password
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

var path = require('path');

var expressValidator = require('express-validator');
const { use } = require('passport');
var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const url = 'mongodb://127.0.0.1:27017/agency_data';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connect to database");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/resource", express.static('resource'));
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
app.use('/', authentication);
app.use('/', dashboard);
app.use('/', dashboard);
app.use('/', daily);
app.use('/', hanghoa);
app.use('/', baocao);
app.use('/', order);
app.use('/', account);


// app.use(passport.initialize());
// app.use(passport.session());

module.exports = app;