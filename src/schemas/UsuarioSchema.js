'use strict'

const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

mongoose.Promise = Promise
let UsuarioSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

UsuarioSchema.pre('save', encryptPassword)

UsuarioSchema.pre('updateOne', encryptPasswordUpdate)

function encryptPassword(next) {
    const usuario = this
    if (!usuario.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()
        bcrypt.hash(usuario.password, salt, function (error, hash) {
            if (error) return next(error)
            usuario.password = hash
            next()
        })
    })
}

function encryptPasswordUpdate(next) {
    const usuario = this.getUpdate();
    if (!usuario.password) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()
        bcrypt.hash(usuario.password, salt, function (error, hash) {
            if (error) return next(error)
            usuario.password = hash
            next()
        })
    })
}

module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuarios')