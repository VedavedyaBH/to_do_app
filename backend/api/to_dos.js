const express = require("express");
const to_dos = express.Router();
const use = require("../util/util.js").use;
const verifyToken = require("../services/jwtTokenService").verifyToken;
const to_doController = require("../controller/to_doController");

to_dos.get("/api/to_do/", use(to_doController.getAllTo_dos));
to_dos.post("/api/to_do/", use(to_doController.createTo_dos));
to_dos.post(
  "/api/to_do/setStatus",
  verifyToken,
  use(to_doController.setStatus)
);
to_dos.get(
  "/api/to_do/getTodo",
  verifyToken,
  use(to_doController.getTo_dos_byId)
);
to_dos.put(
  "/api/to_do/getTodo",
  verifyToken,
  use(to_doController.updateTo_doById)
);
to_dos.delete(
  "/api/to_do/getTodo",
  verifyToken,
  use(to_doController.deleteto_doById)
);

module.exports = to_dos;
