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

const app = express();

// validation middleware
app.use(validationManager.provideDefaultValidator());

// api routes
app.get('/', (req, res) => {
    res.send('ExpressJS Essentials Web API');
});

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    debug('Server running on port' + server.address().port);
});
