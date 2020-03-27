'use strict'

const express = require('express')
const router = express.Router()
const AparcamientoController = require('../controllers/aparcamiento')
const path = require('path');
const multer = require('multer');
const middleware = require('../middleware/index');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'avatars/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

let upload = multer({ storage: storage });

router.post('/aparcamiento', upload.single('avatar'),AparcamientoController.nuevoAparcamiento);
router.get('/aparcamiento', AparcamientoController.getAparcamientos);
router.put('/aparcamiento/photo/:id',upload.single('avatar'),AparcamientoController.updateAparcamientoWithPhoto);
router.get('/aparcamiento/:id', AparcamientoController.getAparcamiento);
router.get('/aparcamiento/user/:userId', AparcamientoController.getAparcamientoOfUser);
router.get('/aparcamientos/zona/:zonaId', AparcamientoController.getAparcamientoOfZona);
router.delete('/aparcamiento/:id', AparcamientoController.deleteAparcamiento);
router.put('/aparcamiento/:id',AparcamientoController.updateAparcamiento);
router.get('/aparcamientos/populares',AparcamientoController.getAparcamientosPopulares);

router.post('/angular/aparcamiento', upload.single('avatar'), middleware.ensureAuthenticatedAndAdmin ,AparcamientoController.nuevoAparcamiento);
router.get('/angular/aparcamiento', middleware.ensureAuthenticatedAndAdmin, AparcamientoController.getAparcamientos);
router.put('/angular/aparcamiento/photo/:id', middleware.ensureAuthenticatedAndAdmin, upload.single('avatar'),AparcamientoController.updateAparcamientoWithPhoto);
router.get('/angular/aparcamiento/:id',middleware.ensureAuthenticatedAndAdmin,  AparcamientoController.getAparcamiento);
router.get('/angular/aparcamiento/user/:userId', middleware.ensureAuthenticatedAndAdmin, AparcamientoController.getAparcamientoOfUser);
router.get('/angular/aparcamientos/zona/:zonaId', middleware.ensureAuthenticatedAndAdmin, AparcamientoController.getAparcamientoOfZona);
router.delete('/angular/aparcamiento/:id', middleware.ensureAuthenticatedAndAdmin, AparcamientoController.deleteAparcamiento);
router.put('/angular/aparcamiento/:id', middleware.ensureAuthenticatedAndAdmin, AparcamientoController.updateAparcamiento);
router.get('/angular/aparcamientos/populares', middleware.ensureAuthenticatedAndAdmin, AparcamientoController.getAparcamientosPopulares);

module.exports = router