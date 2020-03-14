'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aparcamientoSchema = Schema({
    id: String,
    dimension: Number,
    longitud: Number,
    latitud: Number,
    avatar: String,
});

module.exports = mongoose.model('Aparcamiento', aparcamientoSchema);