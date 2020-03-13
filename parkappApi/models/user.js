'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    created_date: { type: Date, default: Date.now },
    fullname: String,
    username: String,
    password: String,
    email: String,
    avatar: String,
    rol: { type: String, enum: ['USER', 'ADMIN'] }
});

module.exports = mongoose.model('User', userSchema);