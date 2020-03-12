'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    fullname: String,
    created_date: { type: Date, default: Date.now },
    username: String,
    password: String,
    email: String,
    estacion_register: [{ type: Schema.Types.ObjectId, ref: 'Estacion' }],
    estacion_mant: [{ type: Schema.Types.ObjectId, ref: 'Estacion' }],
    rol: { type: String, enum: ['USER', 'MANAGER', 'ADMIN'] }

});

module.exports = mongoose.model('User', userSchema);