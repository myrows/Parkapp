'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const UserController = require('../controllers/user')
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

router.post('/login', UserController.login);
router.post('/register', upload.single('avatar'), UserController.register);
router.get('/users', UserController.getUsuarios);
router.get('/user/:id', UserController.getUsuarioById);
router.delete('/user/:id', UserController.deleteUsuarioById);
router.put('/user/:id', upload.single('avatar'), UserController.updateUsuarioWithPhoto);

router.post('/angular/register', middleware.ensureAuthenticatedAndAdmin, upload.single('avatar'), UserController.register);
router.get('/angular/users', middleware.ensureAuthenticatedAndAdmin, UserController.getUsuarios);
router.get('/angular/user/:id', middleware.ensureAuthenticatedAndAdmin, UserController.getUsuarioById);
router.delete('/angular/user/:id', middleware.ensureAuthenticatedAndAdmin, UserController.deleteUsuarioById);
router.put('/angular/user/:id', middleware.ensureAuthenticatedAndAdmin, upload.single('avatar'), UserController.updateUsuarioWithPhoto);

router.get('/avatar/:img', (req, res, next) => {
    let ruta = path.resolve('./','avatars/')
    res.sendFile(ruta + '/' +  req.params.img);
})



module.exports = router