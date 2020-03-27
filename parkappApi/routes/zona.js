'use strict'

const express = require('express')
const router = express.Router()
const ZonaController = require('../controllers/zona')
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

router.post('/zona', upload.single('avatar'),ZonaController.nuevaZona);
router.get('/zona', ZonaController.getZonas);
router.get('/zona/:id', ZonaController.getZona);
router.delete('/zona/:id', ZonaController.deleteZona);
router.put('/zona/:id',upload.single('avatar'),ZonaController.updateZona);

router.post('/angular/zona', middleware.ensureAuthenticatedAndAdmin, upload.single('avatar'),ZonaController.nuevaZona);
router.get('/angular/zona', middleware.ensureAuthenticatedAndAdmin, ZonaController.getZonas);
router.get('/angular/zona/:id', middleware.ensureAuthenticatedAndAdmin, ZonaController.getZona);
router.delete('/angular/zona/:id', middleware.ensureAuthenticatedAndAdmin, ZonaController.deleteZona);
router.put('/angular/zona/:id', middleware.ensureAuthenticatedAndAdmin, upload.single('avatar'),ZonaController.updateZona);

module.exports = router