'use strict';
/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const expressValidator = require('express-validator');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Create Express server.
 */
const app = express();
require('./routes')(app);

/**
 * Connect to MongoDB.
 */
require('./db.config');

/**
 * Express configuration.
 */
app.use(helmet({
    frameguard: true,
    noCache: true,
    referrerPolicy: true,
    hidePoweredBy: true,
    dnsPrefetchControl: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    xssFilter: true,
    permittedCrossDomainPolicies: true
}));
app.use(compression());
app.use(expressValidator());
app.enable('trust proxy');
app.use(cors({
    origin: ['*'],
    methods: ['GET', 'DELETE', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create HTTP server.
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen((process.env.PORT || 3000));