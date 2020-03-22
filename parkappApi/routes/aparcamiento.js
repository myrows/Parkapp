'use strict'

const express = require('express')
const router = express.Router()
const AparcamientoController = require('../controllers/aparcamiento')
const path = require('path');
const multer = require('multer');

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

module.exports = router