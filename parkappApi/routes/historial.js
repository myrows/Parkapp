'use strict'

const express = require('express')
const router = express.Router()
const HistorialController = require('../controllers/historial')
const middleware = require('../middleware/index');


router.post('/historial',HistorialController.crearHistorial)
router.get('/historial', HistorialController.getHistoriales)
router.get('/historial/aparcamiento', HistorialController.getAllHistorialOfAparcamientos)
router.get('/historial/:id', HistorialController.getHistorialById)
router.get('/historial/aparcamiento/:aparcamientoId', HistorialController.getHistorialOfAparcamiento)
router.get('/historial/aparcamiento/sinFechaSalida/:aparcamientoId', HistorialController.getHistorialOfAparcamientoWithOutSalida)
router.delete('/historial/:id', HistorialController.deleteHistorialById)
router.put('/historial/:id', HistorialController.putHistorial)

router.post('/angular/historial', middleware.ensureAuthenticatedAndAdmin ,HistorialController.crearHistorial)
router.get('/angular/historial', middleware.ensureAuthenticatedAndAdmin, HistorialController.getHistoriales)
router.get('/angular/historial/aparcamiento', middleware.ensureAuthenticatedAndAdmin, HistorialController.getAllHistorialOfAparcamientos)
router.get('/angular/historial/:id', middleware.ensureAuthenticatedAndAdmin, HistorialController.getHistorialById)
router.get('/angular/historial/aparcamiento/:aparcamientoId', middleware.ensureAuthenticatedAndAdmin, HistorialController.getHistorialOfAparcamiento)
router.delete('/angular/historial/:id', middleware.ensureAuthenticatedAndAdmin, HistorialController.deleteHistorialById)
router.put('/angular/historial/:id', middleware.ensureAuthenticatedAndAdmin, HistorialController.putHistorial)

module.exports = router

