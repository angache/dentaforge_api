const getDb = require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectId;


exports.getAppointments = (req, res, next) => {
  const db = getDb();
  const x = ObjectId('5f88a3a0e7179a6ea5224c93');

  db.collection('appointments').findOne({ _id: x }).then(doc => {
    res.status(200).json(doc);
  }).catch(err => {
    res.status(400).json(err);

  })
};