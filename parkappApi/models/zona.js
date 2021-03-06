'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zonaSchema = Schema({
    id: String,
    nombre:String,
    ubicacion: String,
    longitud: Number,
    latitud: Number,
    avatar: String,
    distancia:Number
});

module.exports = mongoose.model('Zona', zonaSchema);