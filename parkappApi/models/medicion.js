'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicionSchema = Schema({
    lluvia: Number,
    velocidad_viento:Number,
    direccion_viento:Number,
    temperatura_ambiente:Number,
    temperatura_suelo:Number,
    humedad:Number,
    calidad_aire:Number,
    presion:Number,
    estacion_meteorologica:{ 
        type: Schema.ObjectId,
        ref: "Estacion"
    },
    fecha_hora:Date

});

module.exports = mongoose.model('Medicion', medicionSchema);