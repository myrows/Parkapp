'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resenaSchema = Schema({
    created_date: { type: Date, default: Date.now },
    title : String,
    body : String,
    rate : Number,
    avatar: { type: String, required: false },
    zonaId: String
});

module.exports = mongoose.model('Resena', resenaSchema);