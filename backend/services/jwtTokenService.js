const jwt = require("jsonwebtoken");
const userServices = require("../services/userService");
const Uuid = require("uuid");

exports.createToken = async ({ id }) => {
  try {
    const token = jwt.sign(
      { user: id },
      "helloFirstTryWithJWT_youCannotHyackMe",
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    throw new Error(" Failed to create token");
  }
};

exports.verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  let id = req.header("userid");
  const { username } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "helloFirstTryWithJWT_youCannotHyackMe");
    if (!id) {
      const user_id = await userServices.getUserIdByName({
        username: username,
      });
      if (user_id) {
        id = JSON.stringify(user_id[0].id);
        if (id === JSON.stringify(decoded.user[0].id)) {
          next();
        }
      } else {
        throw new ReferenceError();
      }
    } else if (id) {
      // if (JSON.stringify(decoded.user[0].id) == JSON.stringify(id)) {
      if (JSON.stringify(decoded.user) == id) {
        next();
      } else {
        throw new Error();
      }
    } else {
      throw new Error("Not a right user");
    }
  } catch (error) {
    if (!ReferenceError) {
      res.status(401).json({ error: error.message });
    }
    res.status(401).json({ error: "User not found or JWT expired" });
  }
};
