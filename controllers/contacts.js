const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const returnContacts = async function (req, res) {
  const result = await mongodb.getDb().db('CSE341').collection('Contacts').find();
  result.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  });
};

const returnContact = async function (req, res) {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341').collection('Contacts').find({ _id: userId });
  result.toArray().then((items) => {
    console.log(items);
    res.status(200).json(items[0]);
  });
};

const addContact = async function (req, res) {
  //console.log(req.body);
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db('CSE341').collection('Contacts').insertOne(newContact);

  if (result.acknowledged) {
    res.status(201).json({
      message: 'Post was sucessful',
      body: result
    });
  } else {
    res.status(500).json(response.error || 'Unknown Error');
  }
};

const updateContact = async function (req, res) {
  const userId = new ObjectId(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('Contacts')
    .replaceOne({ _id: userId }, updatedContact);

  if (result.modifiedCount > 0) {
    res.status(200).json({
      message: 'Contact Modified Sucessfully',
      body: result
    });
  } else {
    res.status(500).json(res.error || 'Unknown Error Occured');
  }
};

const deleteContact = async function (req, res) {
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('Contacts')
    .remove({ _id: userId }, true);

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Unknown Error Ocurred');
  }
};

module.exports = {
  returnContact,
  returnContacts,
  addContact,
  updateContact,
  deleteContact
};
