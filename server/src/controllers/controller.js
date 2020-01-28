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

// const controller = {

//     probando: function(req, res){
//         return res.status(200).send({
//             message: "Probando"
//         });
//     },

//     testeando: function(req, res){
//         return res.status(200).send({
//             message: "Testeando"
//         });
//     },

//     save: function(req, res){
//         // Recoger los parametros de la petición 
//         const params = req.body;

//         // Validar los datos
//         const validate_name = !validator.isEmpty(params.name);
//         const validate_surname = !validator.isEmpty(params.surname);
//         const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
//         const validate_password = !validator.isEmpty(params.password);
//         //console.log(validate_name, validate_surname, validate_email, validate_password);

//         if(validate_name && validate_surname && validate_password && validate_email){

//             // Crear objeto de usuario 
//             const user = new user();

//             // Asignar valores al usuario con los datos recibidos de la petición
//             user.name = params.name;
//             user.surname = params.surname;
//             user.email = params.email;
//             user.role = 'ROLE_USER';
//             user.image = null;

//             // Comprobar si el usuario existe
//             User.findOne({email: user.email}, (err, issetUser) => {
//                 if(err){
//                     return res.status(500).send({
//                         message: "Error al comprobar duplicidad de usuario"
//                     });
//                 }
//                 if(!issetUser){


//                 // Si no existe, 

//                 // cifrar la contraseña 
//                 bcrypt.hash(params.password, null, null, (err, hash) => {
//                     user.password = hash;

//                     // y guardar usuarios 
//                     user.save((err, userStored) => {
//                         if(err){
//                             return res.status(500).send({
//                                 message: "Error al guardar el usuario"
//                         });
//                     }

//                     if(!userStored){
//                         return res.status(400).send({
//                             message: "El usuario no se ha guardado"
//                         });
//                     }
//                     // Devolver respuesta
//                         return res.status(200).send({
//                             status: 'success',
//                             user: userStored
//                         });

//                     }); //close save
//                 });  //close bcrypt     

//             }else{
//                 return res.status(200).send({
//                     message: "El usuario ya está registrado"
//                 });
//             }
//         });

//         }else{
//             return res.status(200).send({
//                 message: "Validación de los datos de usuario incorrecta, inténtelo otra vez"
//             });
//         }
//     },

//     login: function(req, res){
//         //Recoger los parámetros de la petición
//         const params =req.body;

//         //Validar los datos
//         const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
//         const validate_password = !validator.isEmpty(params.password);

//         if(!validate_email || !validate_password){
//             return res.status(200).send({
//                 message: "Los datos son incorrectos, envialos bien"
//             });
//         }

//             //Buscar usuarios que coincidan con el email
//             User.findOne({email: params.email.toLowerCase()}, (err, user) => {

//                 if(err){
//                     return res.status(500).send({
//                         message: "Error al intentar identificarse",
//                     });    
//                 }

//                 if(!user){
//                     return res.status(404).send({
//                         message: "El usuario no existe",
//                     }); 
//                 }
//                 //Si lo encuentra,
//                     //Comprobar la contraseña (coincidencia de email y password / bcrypt)
//                     bcrypt.compare(params.password, user.password, (err, check) => {

//                         //Si es correcto, 
//                         if(check){

//                             //Generar datos de jwt y devolverlo
//                             if(params.gettoken){

//                                 //Devolver los datos
//                                 return res.status(200).send({
//                                    token:jwt.createToken(user)
//                                 });

//                             }else{

//                             }      
//                                 //Limpiar objeto para que no devuelva la password a cliente
//                                 user.password = undefined;

//                                 //Devolver los datos
//                                 return res.status(200).send({
//                                     status: "success",
//                                     user
//                                 });
//                         }else{

//                             return res.status(200).send({
//                                 message: "Los datos introducidos no son correctos",
//                             }); 

//                         }

//                     });

//                 });

//             },
//             update: function(req, res){
//                 //1. Crear middleware para comprobar el jwt token, ponerselo a la ruta

//                 return res.status(200).send({
//                     message: "Metodo de actualizacion de datos de usuario"
//                 }); 

//             }
// };

module.exports = {
    register,
    login
};









