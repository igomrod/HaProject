'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "clave-secreta-para-generar-el token-9999";

const authenticated = (req, res, next) => {

    // Comprobar si llega autorización
    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'La petición no tiene la cabecera de authorization'
        })
    }

        // Limpiar el token y quitar comillas
        //const token = req.headers.authorization.replace(/['"]+/g, '');

        try{
        // Decodificar token 
        const payload = jwt.decode(token, secret);

        // Comprobar si el token ha expirado
        if(payload.exp <= moment().unix()){
                return res.status(404).send({
                message: 'El token ha expirado'
            });
        }
       
    }catch(ex){
        return res.status(404).send({
            message: 'El token no es válido'
        });
    }
    
    // Adjuntar usuario identificado a request
    req.id = payload.id;

    // Pasar a la acción
    next();
}


module.exports = {
    authenticated
}