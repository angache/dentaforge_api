const express = require('express');
const treatmentController = require('../controllers/treatment');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/gettreatments', treatmentController.getTreatments);
router.post('/createprocedure', treatmentController.createProcedure);
router.get('/getprocedures', treatmentController.getProcedures);
router.post('/createpatient', patientController.createPatient);
module.exports = router;