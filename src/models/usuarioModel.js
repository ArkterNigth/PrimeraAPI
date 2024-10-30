'use strict'
const Usuario = require('../schemas/UsuarioSchema');
const mongoose = require('mongoose');

async function getById(_id) {
    try {
        const usuario = await Usuario.findOne({ '_id': _id });
        return usuario;
    } catch (err) {
        throw err;
    }
}

async function add(usuario) {
    try {
        const usuarioSchema = new Usuario(usuario);
        const savedUsuario = await usuarioSchema.save();
        return savedUsuario;
    } catch (err) {
        throw err;
    }
}

async function signInWeb(request) {
    try {
        const usuario = await Usuario.findOne({ 'email': request.email });
        return usuario;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    add,
    signInWeb,
    getById
};
