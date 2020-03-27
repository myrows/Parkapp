'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aparcamientoSchema = Schema({
    id: String,
    nombre:String,
    dimension: String,
    longitud: Number,
    latitud: Number,
    puntuacion: { type: Number, default: 0 },
    avatar: { type: String, require: false },
    userId: String,
    zonaId: String
});

module.exports = mongoose.model('Aparcamiento', aparcamientoSchema);