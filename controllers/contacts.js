const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const returnPerson = (req, res, next) => {
  res.json("Tyson Robinson");
}

const returnContacts = async(req, res, next) => {
  const result = await mongodb.getDb().db('CSE341').collection('Contacts').find();
  result.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  })
}

const returnContact = async(req, res, next) => {
  console.log(req.params.id);
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341').collection('Contacts').find({_id: userId});
  result.toArray().then((items)=>{
    console.log(items);
    res.status(200).json(items[0]);
  })
}

module.exports = {returnContact, returnContacts}