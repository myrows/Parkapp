'use strict'

const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const error_types = require('./error_types');
const _ = require('lodash');

const User = require('../models/user');

const USER_LEVEL = 0;
const MANAGER_LEVEL = 1;
const ADMIN_LEVEL = 2;


let controller = {

    register: (req, res, next) => {



        User.find({ username: req.body.username }, (err, result) => {
            if (result.length > 0) {
                next(new error_types.InfoError("Este usuario ya existe en nuestra base de datos"));
            } else {
                let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                let user = new User({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    email: req.body.email,
                    rol: req.body.rol,
                    password: hash
                });

                user.save((err, user) => {
                    if (err) next(new error_types.Error400(err.message));
                    res.status(201).json({
                        id: user._id,
                        fullname: user.fullname,
                        username: user.username,
                        email: user.email
                    });
                });
            }
        })
    },
    login: (req, res, next) => {
        passport.authenticate("local", { session: false }, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("El nombre de usuario/email o la contraseña no son correctos."))
            } else {
                const payload = {
                    sub: user._id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    username: user.username,

                };

                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });
                res.json({
                    username: user.username,
                    token: token
                })

            }
        })(req, res)
    },
    getUsuarios: async(req, res) => {

    
            let result = null;
            result = await User.find()
            .populate('estacion_register')
            .populate('estacion_mant').exec();

            res.status(200).json(result);
            if(result==null){
            res.send(500, error.message);
            }
        
    }


}

module.exports = controller;