'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estacionSchema = Schema({
    name: String,
    /* { type: Array, default: []} */
    location: [String],
    user_register: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    user_mant: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Estacion', estacionSchema);