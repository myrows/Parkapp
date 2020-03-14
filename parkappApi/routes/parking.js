'use strict'

const express = require('express')
const router = express.Router()
const ParkingController = require('../controllers/parking')
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

router.post('/parking', upload.single('avatar'),ParkingController.nuevoParking);
router.get('/parking', ParkingController.getParkings);
router.get('/parking/:id', ParkingController.getParking);
router.delete('/parking/:id', ParkingController.deleteParking);
router.put('/parking/:id',ParkingController.updateParking);

module.exports = router