'use strict'

const error_types = require('./error_types');

const Estacion = require('../models/estacion_meteorologica');
const Medicion = require('../models/medicion');
const User = require('../models/user')
const _ = require('lodash');
var moment = require('moment');
const mongoose = require('mongoose');







module.exports = {

    insertAll: async(req, res) => {
        var ObjectId = mongoose.Types.ObjectId;

        const weathers = [{
                "_id": new ObjectId("76955ca46063c5600627f392"),
                "lluvia": 20,
                "velocidad_viento": 40,
                "direccion_viento": 40,
                "temperatura_ambiente": 17,
                "temperatura_suelo": 14,
                "humedad": 60,
                "calidad_aire": 76,
                "presion": 30,
                "estacion_meteorologica": "66955ca46063c5600627f392",
                "fecha_hora": new Date("2019-10-10")
            },
            {
                "_id": new ObjectId("76955ca46063c5600627f393"),
                "lluvia": 23,
                "velocidad_viento": 42,
                "direccion_viento": 41,
                "temperatura_ambiente": 16,
                "temperatura_suelo": 13,
                "humedad": 60,
                "calidad_aire": 76,
                "presion": 30,
                "estacion_meteorologica": "66955ca46063c5600627f393",
                "fecha_hora": new Date("2019-11-16")
            },
            {
                "_id": new ObjectId("76955ca46063c5600627f394"),
                "lluvia": 23,
                "velocidad_viento": 39,
                "direccion_viento": 39,
                "temperatura_ambiente": 16,
                "temperatura_suelo": 13,
                "humedad": 60,
                "calidad_aire": 76,
                "presion": 30,
                "estacion_meteorologica": "66955ca46063c5600627f394",
                "fecha_hora": new Date("2018-12-10")
            }
        ]

        const stations = [{
                    "_id": new ObjectId("66955ca46063c5600627f392"),
                    "name": "Feria",
                    "location": [],
                    "user_register": "56955ca46063c5600627f393",
                    "user_mant": "56955ca46063c5600627f395"
                }, {
                    "_id": new ObjectId("66955ca46063c5600627f393"),
                    "name": "Feria",
                    "location": [],
                    "user_register": "56955ca46063c5600627f393",
                    "user_mant": "56955ca46063c5600627f394"
                }, {
                    "_id": new ObjectId("66955ca46063c5600627f394"),
                    "name": "Prado",
                    "location": [],
                    "user_register": "56955ca46063c5600627f393",
                    "user_mant": "56955ca46063c5600627f395"
                },
                {
                    "_id": new ObjectId("66955ca46063c5600627f395"),
                    "name": "Alamillo",
                    "location": [],
                    "user_register": "56955ca46063c5600627f394",
                    "user_mant": "56955ca46063c5600627f395"
                }
            ]
            ////////////////////////////////////////////////////////////
        var users = [{
                "_id": new ObjectId("56955ca46063c5600627f393"),
                "fullname": "user",
                "username": "user",
                "password": "$2a$12$7xbHUEFS1pk30vNt4SbfCel3OxAhauco.X1C4flT76sQ19KWo5l1G",
                "email": "user",
                "estacion_register": ["66955ca46063c5600627f392",
                    "66955ca46063c5600627f393"
                ],
                "estacion_mant": null,
                "rol": "USER"
            },
            {
                "_id": new ObjectId("56955ca46063c5600627f394"),
                "fullname": "manager",
                "username": "manager",
                "password": "$2a$12$7xbHUEFS1pk30vNt4SbfCel3OxAhauco.X1C4flT76sQ19KWo5l1G",
                "email": "manager",
                "estacion_register": ["66955ca46063c5600627f395"],
                "estacion_mant": ["66955ca46063c5600627f393"],
                "rol": "MANAGER"
            },
            {
                "_id": new ObjectId("56955ca46063c5600627f395"),
                "fullname": "admin",
                "username": "admin",
                "password": "$2a$12$7xbHUEFS1pk30vNt4SbfCel3OxAhauco.X1C4flT76sQ19KWo5l1G",
                "email": "admin",
                "estacion_register": null,
                "estacion_mant": ["66955ca46063c5600627f392",
                    "66955ca46063c5600627f394",
                    "66955ca46063c5600627f395"
                ],
                "rol": "ADMIN"
            }
        ]


        await User.collection.insertMany(users);
        await Estacion.collection.insertMany(stations);
        await Medicion.collection.insertMany(weathers);

        res.send(201, "Base de datos creada");


    }

}