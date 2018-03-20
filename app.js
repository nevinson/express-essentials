global.APP_ROOT_PATH = __dirname + '/app/';
require('./config/global-paths');
global.config = require('./config');

const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    debug = require('debug'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    path = require('path');

const ValidationManager = require('./app/manager/validation.manager'),
    validationManager = new ValidationManager();

const app = express();

// connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.db.MONGO_CONNECT_URL);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.db.MONGO_CONNECT_URL);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// validation middleware
app.use(validationManager.provideDefaultValidator());

// json formatter middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors middleware
app.use(cors());

// api routes
app.get('/', (req, res) => {
    res.send('ExpressJS Essentials Web API');
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    debug('Server running on port' + server.address().port);
});
