'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const EstacionController = require('../controllers/estacion')

router.post('/', middleware.ensureAuthenticatedAndManager, EstacionController.createStation);
router.get('/', middleware.ensureAuthenticatedAndManager, EstacionController.getAll);
router.get('/:id', middleware.ensureAuthenticatedAndManager, EstacionController.getById);
router.get('/:id/weather/from/:from/to/:to', middleware.ensureAuthenticated, EstacionController.getWeatherOfStationByDate)
router.put('/:id', middleware.ensureAuthenticatedAndManager, EstacionController.putStation);
router.delete('/:id', middleware.ensureAuthenticatedAndManager, EstacionController.delStation);
router.get('/:id/today', middleware.ensureAuthenticated, EstacionController.getSummaryOfToday);
router.get(':id/weather/', middleware.ensureAuthenticated, EstacionController.getWeatherOfStation);

module.exports = router