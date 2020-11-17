const express = require('express');
const treatmentController = require('../controllers/treatment');
const patientController = require('../controllers/patientController');
const appointmentController = require('../controllers/appointmentController');
var cors = require('cors');

const router = express.Router();
router.all('*', cors());

router.get('/gettreatments', treatmentController.getTreatments);
router.post('/createprocedure', treatmentController.createProcedure);
router.get('/getprocedures', treatmentController.getProcedures);
router.post('/createpatient', patientController.createPatient);
router.get('/getappointments', appointmentController.getAppointments);
router.get('/getpatient', patientController.getPatient);
router.get('/getpatientwithnationalid', patientController.getPatientWithNationalId);
router.post('/querypatient', patientController.queryPatient);
module.exports = router;