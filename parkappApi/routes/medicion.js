'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const MedicionController = require('../controllers/medicion')

router.post('/', middleware.ensureAuthenticatedAndManager, MedicionController.nuevaMedicion);
router.get('/today', middleware.ensureAuthenticated, MedicionController.getAllWeatherToday);
router.get('/fromto', MedicionController.getMedicionesEntreFechas);
router.get('/from/:from/to/:to', middleware.ensureAuthenticated, MedicionController.getMedicionesEntreFechas);
router.delete('/:id', middleware.ensureAuthenticatedAndManager, MedicionController.delMedicion);
router.get('/:id', middleware.ensureAuthenticated, MedicionController.getById);


module.exports = router