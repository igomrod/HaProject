    'use strict'

    const jwtToken = require('jwt-simple');
    const validator = require('validator');
    const bcrypt = require('bcrypt');
    const fs = require('fs')
    const csv = require('csvtojson')
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

            const payload = { id: user.id_organizer, exp: 300 };
            const secret = 'rijoiejgoiejo';
            const token = jwtToken.encode(payload, secret);
            validTokens[token];
            res.send(token);
        } catch (e) {
            console.log(e.message);
            res.send(500).send();
        }
        
    };

    const parseCSV = async (req, res) => {
            
        try {
    console.log('A ver');
            const csvObject = await csv({ ignoreEmpty: true }).fromFile(req.file.path)

            const result = await db.parseCSV(csvObject);
            fs.unlinkSync(req.file.path); // Borra archivo temporal.
            res.status(200).send();
        } catch (e) {
            res.status(400)
            res.json({ error: e.message })
        }

    };

    
    //Comprobar si el email es único 
    if(req.user.email != params.email){

        //Buscar usuarios que coincidan con el email
                User.findOne({email: params.email.toLowerCase()}, (err, user) => {

                    if(err){
                        return res.status(500).send({
                            message: "Error al intentar identificarse",                
                        });        
                    }

                    if(!user){
                        return res.status(404).send({
                            message: "El email no puede ser modifica",
                        }); 
                    }
                

    //Actualización de usuarios

                update: function(req, res){
                    //Recoger datos del usuario 
                    const params = req.body;

                    //Validar datos
                    try{
                        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
                        const validate_password = !validator.isEmpty(params.password);
                    }catch(err){
                        return res.status(200).send({
                            message: "Faltan datos por enviar",
                            params
                        });
                    }
                    //Eliminar propiedades innecesarias 
                    delete params.password;

                    const userId = req.user.sub;

                    //Buscar y actualizar documento 
                    User.findOneAndUpdate({_id: userId}, params, {new:true}, (err, userUpdate) => {

                    if(err){
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar usuario'
                    }); 
                
                }
                    if(err || !userUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'No se ha actualizado el usuario'
                    }); 
                
                }
                
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    user: userUpdated;
            }); 
        
    
    module.exports = {
        register,
        login,
        parseCSV
    };












