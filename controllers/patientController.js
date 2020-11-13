const getDb = require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectId;


exports.createPatient = (req, res, next) => {
  const db = getDb();
  // db.collection('patients').insertOne(req.body).then(doc => {
  //   res.status(200).json(doc);
  // });
  db.collection('patients').insert(req.body, function (err, docsInserted) {
    res.status(200).json(docsInserted);
  });
};
exports.updatePatient = (req, res, next) => {
  const db = getDb();
  db.collection('patients').updateOne({ _id: req.body._id }, req.body).then(doc => {
    res.status(200).json(doc);
  });
};
exports.getPatient = (req, res, next) => {
  const db = getDb();
  const { id } = req.query;
  const _id = ObjectId(id);

  db.collection('patients').findOne({ _id }).then(doc => {
    res.status(200).json(doc);
  });
};

exports.getPatientWithNationalId = (req, res, next) => {
  const db = getDb();
  const { nationalId } = req.query;
  console.log(nationalId)
  db.collection('patients').findOne({ idNumber: nationalId }).then(doc => {
    res.status(200).json(doc);
  });
};
exports.queryPatient = (req, res, next) => {
  const db = getDb();
  const { nationalId, firstName, lastName, phoneNumber } = req.query;

  const query = {};
  if (nationalId) {
    query.name = /nationalId/;
  }

  db.collection('patients').findOne(query).then(doc => {
    res.status(200).json(doc);
  });
};