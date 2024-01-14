const express = require("express")
const to_dos = express.Router()
const use = require("../util/util.js").use
const varifyToken = require("../services/jwtTokenService").verifyToken
const to_doController = require("../controller/to_doController")
const { verifyToken } = require("../services/jwtTokenService")


to_dos.get('/api/to_do/', verifyToken, use(to_doController.getAllTo_dos))
to_dos.post('/api/to_do/', verifyToken, use(to_doController.createTo_dos))
to_dos.delete('/api/to_do/')
to_dos.get('/api/to_do/:id')
to_dos.put('/api/to_do/:id')
to_dos.delete('/api/to_do/:id')

module.exports = to_dos;  