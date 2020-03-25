'use strict'

const error_types = require('./error_types');
const Zona = require('../models/zona');


let controller = {

    //Crear Parking
    nuevaZona: (req, res, next) => {

            let zona = new Zona({
                ubicacion: req.body.ubicacion,
                longitud: req.body.longitud,
                latitud: req.body.latitud,
                avatar: (typeof req.file != "undefined") ? req.file.filename : '',
                nombre:req.body.nombre,
                distancia:req.body.distancia
            });
            zona.save()
            .then(ap => res.status(201).json(ap))
            .catch(err => res.send(500).json(err.message)) 

            },

    //Listado de aparcamientos        
    getZonas: async(req, res) => {

        let resultado = null
        try {
            resultado = await Zona.find() 
                res.status(200).json(resultado);
        
                } catch (err) {
                    res.send(500, err.message);
                }
        
            },

    //Coger un Parking
    getZona: async(req, res) => {

         try {
            let resultado = null
            resultado = await Zona.findById(req.params.id)
                        .exec();

                    res.status(200).json(resultado);
        
                } catch (err) {
                    res.send(500, err.message);
                }
            },

            updateZona: async(req, res) => {
                const _id = req.params.id;
                Zona.updateOne({_id}, {
                        ubicacion: req.body.ubicacion,
                        longitud: req.body.longitud,
                        latitud : req.body.latitud,
                        nombre:req.body.nombre,
                        avatar: req.file.filename,
                        distancia:req.body.distancia
                    })
                    .exec(function(err, zona) {
                        if (err) res.send(500, err.message);
                        res.status(201).json({
                            zona: zona
                        })
                    })
        
            },
    deleteZona: function(req, res) {
        Zona.findByIdAndDelete(req.params.id, function(err, Zona) {
            if (err) return res.status(500).send(err.message);
            res.send(204);
        });
    }


}

module.exports = controller;