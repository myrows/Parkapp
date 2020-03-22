'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialSchema = Schema({
    id: String,
    fechaEntrada: Date,
    fechaSalida : Date,
    dia : Date,
    aparcamientoId : String,
    aparcamiento : { 
        type: Schema.Types.ObjectId,
        ref: 'Aparcamiento' 
    }
});

module.exports = mongoose.model('Historial', historialSchema);