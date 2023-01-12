const routes = require('express').Router();

const contactRoutes = require('./contacts');


routes.use('/contacts', require('./contacts'));

module.exports = routes;