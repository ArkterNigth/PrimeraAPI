const usuarioModel = require("../models/usuarioModel"),
  jwt = require("../services/jwt"),
  { validationResult } = require("express-validator"),
  bcrypt = require('bcrypt')

function getById(req, res) {

  let _id = req.params._id
  let response = usuarioModel.getById(_id)

  response.then(function (resolve) {
    if (resolve == null) {
      return res.status(202).send({
        message: `El usuario no existe.`
      })
    }
    return res.status(200).send(resolve)
  }).catch(function (reject) {
    return res.status(500).send({
      message: reject.stack
    })
  })
}

function add(req, res) {
  let data = {
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: req.body.password
  }, errors = validationResult(req);

  return !errors.isEmpty()
    ? res.status(422).json({ errors: errors.array() })
    : usuarioModel.add(data)
      .then(async (result) => {
        return res.status(201).send({
          message: `Registro correcto`
        });
      })
      .catch(error => {
        return res.status(500).json({ error: error.stack });
      });
};

function signInWeb(req, res) {
  let auth = {
    email: req.body.email,
    password: req.body.password
  },
    errors = validationResult(req);

  return !errors.isEmpty()
    ? res.status(422).json({ errors: errors.array() })
    : usuarioModel.signInWeb(auth)
      .then(usuario => {
        if (usuario == null) {
          return res.status(403).send({
            type: `usuario-not-found`,
            message: "El usuario no existe."
          })
        }
        bcrypt.compare(auth.password, usuario.password, function (err, result) {
          if (err) {
            return res.status(500).send({
              message: err.stack
            })
          } else if (!result) {
            return res.status(403).send({
              type: `bad-credentials`
              , message: `Correo o contraseña incorrecta.`
            })
          } else {
            let response = {
              token: jwt.createToken({
                _id: usuario._id
              }),
              _id: usuario._id,
              nombres: usuario.nombres,
              apellidos: usuario.apellidos,
              email: usuario.email,
            }
            return res.status(200).send(response)
          }
        })
      })
      .catch(error => {
        return res.status(500).json({ error: error.stack });
      });
};


module.exports = {
  getById,
  add,
  signInWeb
}
