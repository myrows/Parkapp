'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSchema = Schema({
    id: String,
    nombre:String,
    ubicacion: String,
    longitud: Number,
    latitud: Number,
    isPublic:Boolean,
    avatar: String,
    distancia:Number
});

module.exports = mongoose.model('Parking', parkingSchema);