'use strict'

const usuarioController = require('../controllers/usuarioController'),
    express = require('express'),
    router = express.Router(),
    { check } = require('express-validator')

router
    .get('/usuarios/:_id', usuarioController.getById)
    .post('/usuarios/', [
        check('nombres').exists().isString().not().isEmpty(),
        check('apellidos').exists().isString().not().isEmpty(),
        check('email').exists().isEmail().not().isEmpty(),
        check('password').exists().isString().isLength({ min: 5 })
    ], usuarioController.add)
    .post('/usuarios/login/', [
        check('email').exists().isEmail().not().isEmpty(),
        check('password').exists().isString().isLength({ min: 5 })
    ], usuarioController.signInWeb)


module.exports = router