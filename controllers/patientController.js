const getDb = require('../util/database').getDb;

exports.createPatient = (req, res, next) => {
  const db = getDb();
  db.collection('patients').insertOne(req.body).then(doc => {
    res.status(200).json(doc);
  });
};