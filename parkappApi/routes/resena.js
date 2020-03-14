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
router.delete('/resena/:id', ResenaController.deleteResenaById)
router.put('/resena/:id', ResenaController.putResena)


module.exports = router

