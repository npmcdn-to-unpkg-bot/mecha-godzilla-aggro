'use strict';

require('babel-register');

const express = require('express');
const defaults = require('./serverConfig');
const path = require('path');
const app = express();

app.use('/js', express.static(`${__dirname}/public/js`))
    .use('/css', express.static(`${__dirname}/public/css`))
    .use('/', express.static(`${__dirname}/`))
    .use('/views', express.static('./views/'));

require('./routerConfig')(app, defaults);

app.listen(defaults.port, function () {
    console.log(`[*] Listening on port ${defaults.port}`);
});
