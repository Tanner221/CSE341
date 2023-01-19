const routes = require('express').Router();

const contactController = require('../controllers/contacts');

routes.get('/', contactController.returnContacts);
routes.get('/:id', contactController.returnContact);
routes.post('/', contactController.addContact);
routes.put('/:id', contactController.updateContact);
routes.delete('/:id', contactController.deleteContact);

module.exports = routes;
