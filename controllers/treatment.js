const getDb = require('../util/database').getDb;

exports.getTreatments = (req, res, next) => {
  const db = getDb();
  db.collection('test').findOne({ name: 'ali' }).then(doc => {
    res.status(200).json(doc);
  });
};

