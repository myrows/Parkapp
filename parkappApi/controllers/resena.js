'use strict'

const Resena = require('../models/resenas')
const error_types = require('./error_types');


let controller = {
    createResena: (req, res) => {

        let resena = new Resena({
            title: req.body.title,
            body: req.body.body,
            rate: req.body.rate,
            avatar: req.body.avatar,
            zonaId: req.body.zonaId
        });

        resena.save()
            .then(e => res.status(201).json(e))
            .catch(error => res.send(500).json(error.message));

    },
    getResenas: async(req, res) => {

    
        let result = null;
        result = await Resena.find()

        if(result != null){
            res.status(200).json(result)
        
        }else{
            res.send(500, error.message)
        }
    },
    getResenaById: async(req, res) => {

        let result = null;
        const _id = req.params.id
        result = await Resena.findById(_id);

        if(result == null){
            res.send(500, error.message);
        }else{
            res.status(200).json(result);
        }

    },
    getResenaOfZona: async(req, res) => {

        try {
           let resultado = null
           resultado = await Resena.find({zonaId: req.params.zonaId})
                       .exec();

                   res.status(200).json(resultado);
       
               } catch (err) {
                   res.send(500, err.message);
               }
           }
    ,
    deleteResenaById: async(req, res) => {

        let result = null;
        const _id = req.params.id
        result = await Resena.findByIdAndDelete(_id);
    
        if(result == null){
            res.send(500, error.message);
        }else{
            res.status(200).json(result);
        }
    
    },
    putResena: async(req, res) => {
        const _id = req.params.id;
        Resena.updateOne({_id}, {
                title: req.body.title,
                body: req.body.body,
                rate : req.body.rate
            })
            .exec(function(err, resena) {
                if (err) res.send(500, err.message);
                res.status(200).json({
                    resena: resena
                })
            })

    }


}

module.exports = controller;