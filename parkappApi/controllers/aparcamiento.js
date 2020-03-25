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
                puntuacion : req.body.puntuacion,
                avatar: (typeof req.file != "undefined") ? req.file.filename : '',
                nombre:req.body.nombre,
                userId: req.body.userId,
                zonaId: req.body.zonaId,
                historial: req.body.historial.id
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

    getAparcamientosPopulares: async(req,res) =>{

        let resultado = null
        var mysort = { puntuacion: -1 };
            try{
                resultado = await Aparcamiento.find({puntuacion: { $gt: 4 }}).sort(mysort)
                    res.status(200).json(resultado);
            } catch (err){
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
            getAparcamientoOfUser: async(req, res) => {
                let resultado = null

                try {
                    resultado = await Aparcamiento.find({userId: req.params.userId}) 
                        res.status(200).json(resultado);
                
                        } catch (err) {
                            res.send(500, err.message);
                        }
                   },
                   getAparcamientoOfZona: async(req, res) => {

                try{
                    let resultado = null
                    resultado = await Aparcamiento.find({zonaId: req.params.zonaId})
                    .populate('historial')
                    .exec();
                    
                    res.status(200).json(resultado);
                }catch (err){
                    res.send(500, err.message);
                }

                       },

            updateAparcamiento: async(req, res) => {
                const _id = req.params.id;
                Aparcamiento.updateOne({_id}, {
                        dimension: req.body.dimension,
                        longitud: req.body.longitud,
                        latitud : req.body.latitud,
                        puntuacion: req.body.puntuacion,
                        nombre:req.body.nombre,
                        userId:req.body.userId
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
    },

    updateAparcamientoWithPhoto: async(req, res) => {
        const _id = req.params.id;
        Aparcamiento.updateOne({_id}, {
                dimension: req.body.dimension,
                longitud: req.body.longitud,
                latitud : req.body.latitud,
                puntuacion: req.body.puntuacion,
                nombre:req.body.nombre,
                userId:req.body.userId,
                avatar:req.file.filename,
                zonaId: req.body.zonaId,
                historial: req.body.historial.id
            })
            .exec(function(err, aparcamiento) {
                if (err) res.send(500, err.message);
                res.status(201).json({
                    aparcamiento: aparcamiento
                })
            })

    }
    


}

module.exports = controller;