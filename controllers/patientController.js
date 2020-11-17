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
exports.queryPatient = async (req, res, next) => {
  const db = getDb();
  const searchKey = req.body.search ? req.body.search[0].key : null;
  const { skip, take } = req.body;
  const query = searchKey ? { keywords: { $elemMatch: { $regex: searchKey, $options: 'i' } } } : {};
  const res2 = await db.collection('patients').find(query).limit(take).skip(skip);
  const result = await res2.toArray();
  const count = await res2.count();
  res.status(200).json({ result, count });

};


exports.createFakeData = (req, res, next) => {

  const db = getDb();
  const { nationalId } = req.query;
  console.log(nationalId)
  db.collection('patients').findOne({ idNumber: nationalId }).then(doc => {
    res.status(200).json(doc);
  });
};