const express = require("express");
const user = express.Router();
const use = require("../util/util.js").use;
const userController = require("../controller/userController.js");
const verifyToken = require("../services/jwtTokenService").verifyToken;

user.get("/api/user/name", verifyToken, use(userController.getUserbyName));
user.post("/api/user/name/id", use(userController.getUserIdbyName));
user.get("/api/user/:id", verifyToken, use(userController.getUserbyId));
user.post("/api/register", use(userController.createNewUser));
user.post("/api/login", use(userController.userLogin));
user.delete("/api/user/:id", verifyToken, use(userController.deleteUser));

module.exports = user;
