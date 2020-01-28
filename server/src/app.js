'use strict'

//Requires
const express = require('express');
const bodyParser = require('body-parser');
//Ejecutar express
const app = express();
//Cargar archivos de rutas
const user_routes = require('./routes/user');
//Middelwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//CORS

//Reescribir rutas
app.use('', user_routes);




app.listen(3000, function() {
    console.log('Escuchando en el puerto 3000')
})
