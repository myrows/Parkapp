'use strict'

const error_types = require('./error_types');
const Medicion = require('../models/medicion');
const _ = require('lodash');
var moment = require('moment');

const USER_LEVEL = 0;
const MANAGER_LEVEL = 1;
const ADMIN_LEVEL = 2;

module.exports = {

    nuevaMedicion: (req, res) => {

        let medicion = new Medicion({

            lluvia: req.body.lluvia,
            velocidad_viento: req.body.v_viento,
            direccion_viento: req.body.d_viento,
            temperatura_ambiente: req.body.temp_ambiente,
            temperatura_suelo: req.body.temp_suelo,
            humedad: req.body.humedad,
            calidad_aire: req.body.c_aire,
            presion: req.body.presion,
            estacion_meteorologica: req.body.estacion_meteorologica,
            fecha_hora: Date.now()

        });

        medicion.save()
            .then(e => e.populate('estacion_meteorologica').execPopulate())
            .then(e => res.status(201).json(e))
            .catch(error => res.send(500).json(error.message));

    },
    getAllWeatherToday: (req, res) => {

        const start = moment().startOf('day').format();
        const end = moment().endOf('day').format();

        Medicion.find({ fecha_hora: { $gte: start, $lte: end } })
            .sort({ fecha_hora: 1 })
            .populate({
                path: 'estacion_meteorologica',
                populate: { path: 'user_register', select: ['fullname', 'email'] }
            })
            .populate({
                path: 'estacion_meteorologica',
                populate: { path: 'user_mant', select: ['fullname', 'email'] }
            })
            .exec(function(err, medicion) {
                if (err) res.send(500, err.message);
                res.status(200).json({
                    medicion: medicion
                });
            });
    },
    getMedicionesEntreFechas: (req, res) => {
        const from = moment(req.params.from).format();
        const to = moment(req.params.to).format();
        Medicion.find({ fecha_hora: { $gte: from, $lte: to } })
            .sort({ fecha_hora: 1 })
            .populate({
                path: 'estacion_meteorologica',
                populate: { path: 'user_register', select: ['fullname', 'email'] }
            })
            .populate({
                path: 'estacion_meteorologica',
                populate: { path: 'user_mant', select: ['fullname', 'email'] }
            })
            .exec(function(err, medicion) {
                if (err) res.send(500, err.message);
                res.status(200).json({
                    medicion: medicion
                });
            });

    },
    getById: async(req, res) => {

        //if (_.indexOf(req.user.rol, 'MANAGER') >= 0){          

        const _id = req.params.id;
        Medicion.findById(_id)
            .populate('estacion_meteorologica')
            .exec(function(err, medicion) {
                if (err) res.send(500, err.message);
                res.status(200).json({
                    medicion: medicion

                });

            });
        /*} else {
            next(new error_types.Error401('No estás autorizado con el rol de MANAGER'));
        }*/



    },
    delMedicion: (req, res) => {
        Medicion.findByIdAndDelete(req.params.id, (error, medicion) => {
            if (error) { res.send(500, err.message) };
            res.status(204).json(medicion)
        })

    }

}