const routes = require('express').Router();

const contactController = require('../controllers/contacts');

routes.get('/', contactController.returnContacts);
routes.get('/:id', contactController.returnContact);

module.exports = routes;
