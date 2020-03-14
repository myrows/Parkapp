'use strict'

const error_types = require('./error_types');
const Parking = require('../models/parking');


let controller = {

    //Crear Parking
    nuevoParking: (req, res, next) => {

            let parking = new Parking({
                ubicacion: req.body.ubicacion,
                longitud: req.body.longitud,
                latitud: req.body.latitud,
                avatar: req.file.filename,
                nombre:req.body.nombre,
                isPublic:req.body.isPublic,
                distancia:req.body.distancia
            });
            parking.save()
            .then(ap => res.status(201).json(ap))
            .catch(err => res.send(500).json(err.message)) 

            },

    //Listado de aparcamientos        
    getParkings: async(req, res) => {

        let resultado = null
        try {
            resultado = await Parking.find() 
                res.status(200).json(resultado);
        
                } catch (err) {
                    res.send(500, err.message);
                }
        
            },

    //Coger un Parking
    getParking: async(req, res) => {

         try {
            let resultado = null
            resultado = await Parking.findById(req.params.id)
                        .exec();

                    res.status(200).json(resultado);
        
                } catch (err) {
                    res.send(500, err.message);
                }
            },

            updateParking: async(req, res) => {
                const _id = req.params.id;
                Parking.updateOne({_id}, {
                        ubicacion: req.body.ubicacion,
                        longitud: req.body.longitud,
                        latitud : req.body.latitud,
                        nombre:req.body.nombre,
                        isPublic:req.body.isPublic,
                        distancia:req.body.distancia
                    })
                    .exec(function(err, parking) {
                        if (err) res.send(500, err.message);
                        res.status(201).json({
                            parking: parking
                        })
                    })
        
            },
    deleteParking: function(req, res) {
        Parking.findByIdAndDelete(req.params.id, function(err, Parking) {
            if (err) return res.status(500).send(err.message);
            res.send(204);
        });
    }


}

module.exports = controller;