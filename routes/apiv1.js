const express = require('express');
const treatmentController = require('../controllers/treatment');

const router = express.Router();

router.get('/gettreatments', treatmentController.getTreatments);
module.exports = router;