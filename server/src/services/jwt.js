'use strict'

const jwt = require ('jwt-simple');
const moment = require('moment'); //fecha de creación y expiración del token

exports.createToken =  function(user){

    //datos del usuario que queremos generar e identificar su token 
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fecha exaxta de creacion del token
        exp: moment().add(30, 'days').unix // fecha exaxta de expiración del token
    };

    return jwt.encode(payload, 'clave-secreta-para-generar-el-token-9999');
};