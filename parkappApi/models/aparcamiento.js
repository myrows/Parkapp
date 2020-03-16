'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aparcamientoSchema = Schema({
    id: String,
    nombre:String,
    dimension: String,
    longitud: Number,
    latitud: Number,
    avatar: String,
    userId: String,
    zonaId: String,
});

module.exports = mongoose.model('Aparcamiento', aparcamientoSchema);