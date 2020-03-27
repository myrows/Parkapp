'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const ResenaController = require('../controllers/resena')
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'avatars/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +Date.now() + path.extname(file.originalname))
    }
  })

  let upload = multer({ storage: storage });

router.post('/resena', upload.single('avatar') ,ResenaController.createResena)
router.get('/resena', ResenaController.getResenas)
router.get('/resena/:id', ResenaController.getResenaById)
router.get('/resena/zona/:zonaId', ResenaController.getResenaOfZona)
router.delete('/resena/:id', ResenaController.deleteResenaById)
router.put('/resena/:id', ResenaController.putResena)

router.post('/angular/resena', middleware.ensureAuthenticatedAndAdmin ,upload.single('avatar') ,ResenaController.createResena)
router.get('/angular/resena', middleware.ensureAuthenticatedAndAdmin, ResenaController.getResenas)
router.get('/angular/resena/:id', middleware.ensureAuthenticatedAndAdmin, ResenaController.getResenaById)
router.get('/angular/resena/zona/:zonaId', middleware.ensureAuthenticatedAndAdmin, ResenaController.getResenaOfZona)
router.delete('/angular/resena/:id', middleware.ensureAuthenticatedAndAdmin, ResenaController.deleteResenaById)
router.put('/angular/resena/:id', middleware.ensureAuthenticatedAndAdmin, ResenaController.putResena)


module.exports = router

