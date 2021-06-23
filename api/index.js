let express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
mailer = require('express-mailer');

let isProduction = process.env.NODE_ENV === 'production';

// Create global app object
let app = express();


app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(session({secret: 'conduit', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

if (!isProduction) {
    app.use(errorhandler());
}

if (isProduction) {
    mongoose.connect('mongodb://localhost:32770');
} else {
    mongoose.connect('mongodb://localhost:32770');
    mongoose.set('debug', true);
}
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

require('./models/Restaurants');
require('./models/User');
require('./config/passport');

app.use(require('./routes'));


/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
if (!isProduction) {
    app.use(function (req, res, next) {

        res.status(res.status || 500);

        res.json({
            'errors': {
                message: res.error(),
                error: res
            }
        });
    });
}

// production error handler
app.use(function (req, res, next) {
    res.status(res.status || 500);
    res.json({
        'errors': {
            message: res.error(),
            error: {}
        }
    });
});

// finally, let's start our server...
let server = app.listen(process.env.PORT || 30000, "127.0.0.1", function () {
    console.log('Listening on port ' + server.address().address + ":" + server.address().port);
});
