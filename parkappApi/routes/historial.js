'use strict'

const express = require('express')
const router = express.Router()
const HistorialController = require('../controllers/historial')


router.post('/historial',HistorialController.crearHistorial)
router.get('/historial', HistorialController.getHistoriales)
router.get('/historial/aparcamiento', HistorialController.getAllHistorialOfAparcamientos)
router.get('/historial/:id', HistorialController.getHistorialById)
router.get('/historial2/:aparcamientoId', HistorialController.getHistorialOfAparcamiento)
router.delete('/historial/:id', HistorialController.deleteHistorialById)
router.put('/historial/:id', HistorialController.putHistorial)

module.exports = router

