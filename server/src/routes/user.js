'use strict'
const controller = require('../controllers/controller')
const { authenticated } = require('../middlewares/authenticated')
const express = require('express');
//const UserController = require('../controller/user');

const router = express.Router();
//const md_auth = require('../middlewares/authenticated');


router.post('/register/', controller.register);
router.post('/login/', controller.login);
router.post('/events/', controller.createEvent);
router.delete('/events/:id', controller.deleteEvent);
// router.get('/participants')
// router.put('/participants/:id')


//comprobar la autenticación




//Rutas de prueba
// router.get('/probando',  );
// router.post('/testeando', UserController.testeando);


//Rutas de usuarios
// routes.post('/register', UserController.save);
// routes.post('/login', UserController.login);
// routes.put('/update', md_auth.authenticated, UserController.update); //actualización de datos del usuario registrado

module.exports = router;
