'use strict'

const jwtToken = require('jwt-simple');
const validator = require('validator');
const bcrypt = require('bcrypt');

const jwt = require('../services/jwt');
const db = require('../db');
const validTokens = {};
const register = async (req, res) => {

    const { name, surname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await db.saveUsers(name, surname, email, hashedPassword);

        res.send();
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e);
    }

}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await db.login(email);

        console.log(user);

        const samePassword = await bcrypt.compare(password, user.hash);
        if (!samePassword) {
            throw Error('Usuario incorrecto');
        }
        
        const payload = { id: user.id_organizer, exp: 300};
        const secret = 'rijoiejgoiejo';
        const token = jwtToken.encode(payload, secret);
        validTokens[token];
        res.send(token);
    }   catch(e) {
        console.log(e.message);
        res.send(500).send();
    }

    }

     


    //Buscar usuarios que coincidan con el email
    User.findOne({email: params.email.toLowerCase()}, (err, user) => {

        if(err){
            return res.status(500).send({
                message: "Error al intentar identificarse",
            });    
        }

        if(!user){
            return res.status(404).send({
                message: "El usuario no existe",
            }); 
        }
        //Si lo encuentra,
            //Comprobar la contraseña (coincidencia de email y password / bcrypt)
                bcrypt.compare(params.password, user.password, (err, check) => {

                //Si es correcto, 
                if(check){
                    //Generar datos de jwt y devolverlo
                    if(params.gettoken){

                        //Devolver los datos
                        return res.status(200).send({
                            token:jwt.createToken(user)
                        });

                    else{

                }    
                //Limpiar objeto para que no devuelva la password a client
                user.password = undefined;

                //Devolver los datos
                    return res.status(200).send({
                    status: "success",
                    user
                    });
                }else{

                return res.status(200).send({
                    message: "Los datos introducidos no son correctos",
                }); 

        }

                        });

                    });


//Actualizar datos usuarios
update: function(req, res){
//Recoger datos usuario
const update = req.body;

//validar datos
try{
const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email)
}
catch(err){
    return res.status(200).send({
    message: "Faltan datos por enviar"
    
    }); 
}
//Eliminar propiedades innecesarias
delete params.password; 

const usrId = req.user.sub;

//Buscar y actualizar documento
User.findOneAndUpdate({_id:userId}, params, {new:true}, (err, userUpdated) => {
    
    if(err){
        return res.status(500).send({
            status: 'err',
            message: 'Error al actualizar usuario'
            
        }); 
    }

    if(!userUpdated){
        return res.status(200).send({
            status: 'error',
            user: 'No se ha actualizado el usuario'
       }); 
    }

    return res.status(200).send({
        status: "success",
        user: userUpdated
    }); 
}


 


module.exports = {
    register,
    login
}









