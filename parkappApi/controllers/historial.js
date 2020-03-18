'use strict'

const Historial = require('../models/historial')
const error_types = require('./error_types');


let controller = {
    crearHistorial: (req, res) => {

        let historial = new Historial({
            fechaEntrada: req.body.fechaEntrada,
            fechaSalida : req.body.fechaSalida,
            dia : req.body.dia,
            aparcamientoId : req.body.aparcamientoId
        });

        historial.save()
            .then(e => res.status(201).json(e))
            .catch(error => res.send(500).json(error.message));

    },
    getHistoriales: async(req, res) => {

    
        let result = null;
        result = await Historial.find()

        if(result != null){
            res.status(200).json(result)
        
        }else{
            res.send(500, error.message)
        }
    },
    getHistorialById: async(req, res) => {

        let result = null;
        const _id = req.params.id
        result = await Historial.findById(_id);

        if(result == null){
            res.send(500, error.message);
        }else{
            res.status(200).json(result);
        }

    },
    getHistorialOfAparcamiento: async(req, res) => {

        try {
           let resultado = null
           resultado = await Historial.find({aparcamientoId: req.params.aparcamientoId})
                       .exec();

                   res.status(200).json(resultado);
       
               } catch (err) {
                   res.send(500, err.message);
               }
           },
    deleteHistorialById: async(req, res) => {

        let result = null;
        const _id = req.params.id
        result = await Historial.findByIdAndDelete(_id);
    
        if(result == null){
            res.send(500, error.message);
        }else{
            res.status(200).json(result);
        }
    
    },
    putHistorial: async(req, res) => {
        const _id = req.params.id;
        Historial.updateOne({_id}, {
                fechaEntrada: req.body.fechaEntrada,
                fechaSalida: req.body.fechaSalida,
                dia : req.body.dia,
                aparcamientoId: req.body.aparcamientoId
            })
            .exec(function(err, historial) {
                if (err) res.send(500, err.message);
                res.status(200).json({
                    historial: historial
                })
            })

    }


}

module.exports = controller;