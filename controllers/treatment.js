const getDb = require('../util/database').getDb;

exports.getTreatments = (req, res, next) => {
  const db = getDb();
  db.collection('treatment_plans').findOne({ _id: '5f52baab6b93754e8b750ce9' }).then(doc => {
    res.status(200).json(doc);
  });
};
exports.getProcedures = (req, res, next) => {
  const db = getDb();
  try {
    const procedures = db.collection('procedures').find().toArray();
    procedures.then(result => {
      res.status(200).json(result);
    })
      .catch(error => {
        res.status(500).json({ message: 'Server error', error });

      })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });

  }
};
exports.createProcedure = (req, res, next) => {
  const db = getDb();
  try {
    db.collection('procedures').insertOne(req.body).then(doc => {
      res.status(200).json(req.body);
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

};

