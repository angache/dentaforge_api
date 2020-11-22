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
  // const searchKey = req.body.search ? req.body.search[0].key : null;
  let { skip, take } = req.body;
  console.log(req.body);
  const filterQuery = [];
  let searchQuery = {};

  if (req.body.search) {
    // const query = searchKey ? { keywords: { $elemMatch: { $regex: searchKey, $options: 'i' } } } : {};
    searchQuery = searchQuery = {
      keywords: { $elemMatch: { $regex: req.body.search.value, $options: 'i' } }
    }
  }

  if (req.body.where) {
    req.body.where.forEach(item => {

      const newItem = {};
      newItem[item.key] = { $regex: item.value, $options: 'i' };
      filterQuery.push(newItem);
    });
  }
  let sort = { firstName: 1 };
  if (req.body.sorting) {
    req.body.sorting.forEach(item => {
      if (Object.keys(item).length > 0 && item.constructor === Object) {
        const direction = item.direction === 'Ascending' ? 1 : -1;
        sort = {};
        sort[`${item.field}`] = direction;
      }
    })
  }

  const finalQuery = filterQuery && filterQuery.length > 0 ? { $and: filterQuery } : searchQuery;
  const cursor = await db.collection('patients').find(finalQuery).limit(take).skip(skip).sort(sort);
  const result = await cursor.toArray();
  const count = await cursor.count();
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