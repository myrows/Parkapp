'use strict'

const express = require('express')
const router = express.Router()
const HistorialController = require('../controllers/historial')


router.post('/historial',HistorialController.crearHistorial)
router.get('/historial', HistorialController.getHistoriales)
router.get('/historial/:id', HistorialController.getHistorialById)
router.delete('/historial/:id', HistorialController.deleteHistorialById)
router.put('/historial/:id', HistorialController.putHistorial)

module.exports = router

