'use strict'

const error_types = require('./error_types');
const Aparcamiento = require('../models/aparcamiento');


let controller = {

    //Crear Aparcamiento
    nuevoAparcamiento: (req, res, next) => {

            let aparcamiento = new Aparcamiento({
                dimension: req.body.dimension,
                longitud: req.body.longitud,
                latitud: req.body.latitud,
                avatar: req.file.filename,
                nombre:req.body.nombre,
            });
            aparcamiento.save()
            .then(ap => res.status(201).json(ap))
            .catch(err => res.send(500).json(err.message)) 

            },

    //Listado de aparcamientos        
    getAparcamientos: async(req, res) => {

        let resultado = null
        try {
            resultado = await Aparcamiento.find() 
                res.status(200).json(resultado);
        
                } catch (err) {
                    res.send(500, err.message);
                }
        
            },

    //Coger un aparcamiento
    getAparcamiento: async(req, res) => {

         try {
            let resultado = null
            resultado = await Aparcamiento.findById(req.params.id)
                        .exec();

                    res.status(200).json(resultado);
        
                } catch (err) {
                    res.send(500, err.message);
                }
            },

            updateAparcamiento: async(req, res) => {
                const _id = req.params.id;
                Aparcamiento.updateOne({_id}, {
                        dimension: req.body.dimension,
                        longitud: req.body.longitud,
                        latitud : req.body.latitud,
                        nombre:req.body.nombre,
                    })
                    .exec(function(err, aparcamiento) {
                        if (err) res.send(500, err.message);
                        res.status(201).json({
                            aparcamiento: aparcamiento
                        })
                    })
        
            },
    deleteAparcamiento: function(req, res) {
        Aparcamiento.findByIdAndDelete(req.params.id, function(err, Aparcamiento) {
            if (err) return res.status(500).send(err.message);
            res.send(204);
        });
    }


}

module.exports = controller;