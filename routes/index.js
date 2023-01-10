const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.returnPerson);

module.exports = routes;