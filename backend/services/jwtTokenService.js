const jwt = require("jsonwebtoken");
const userServices = require("../services/userService");
const Uuid = require("uuid");

exports.createToken = async ({ id }) => {
  console.log("---------Creating a token---------");
  console.log("-------------------");
  console.log(" ");
  console.log(id);
  console.log(" ");
  console.log("-------------------");
  try {
    const token = jwt.sign(
      { user: id },
      "helloFirstTryWithJWT_youCannotHyackMe",
      {
        expiresIn: "1h",
      }
    );
    console.log("---------token created---------");
    console.log("-------------------");
    console.log(" ");
    console.log(token);
    console.log(" ");
    console.log("-------------------");
    return token;
  } catch (error) {
    throw new Error(" Failed to create token");
  }
};

exports.verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  let id = req.header("userid");
  const { username } = req.body;

  // let tokenValue = token.genToken;
  console.log(token);
  console.log(username);

  // Parse JSON string
  //   const jsonData = JSON.parse(token);

  // //   // Extract genToken
  //   const genToken = jsonData.genToken;

  //   console.log(genToken);

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    console.log("---------Veifying the token---------");
    const decoded = jwt.verify(token, "helloFirstTryWithJWT_youCannotHyackMe");
    if (!id) {
      const user_id = await userServices.getUserIdByName({
        username: username,
      });
      if (user_id) {
        id = JSON.stringify(user_id[0].id);
        if (id === JSON.stringify(decoded.user[0].id)) {
          console.log("---------token verifed---------");
          next();
        }
      } else {
        throw new ReferenceError();
      }
    } else if (id) {
      console.log("jasfjbfjhbfksabkjbnksabnkjfbnskfjn");
      console.log(id);
      console.log(decoded.user);
      console.log(JSON.stringify(decoded.user) == id);
      // if (JSON.stringify(decoded.user[0].id) == JSON.stringify(id)) {
      if (JSON.stringify(decoded.user) == id) {
        console.log("---------token verifed---------");
        next();
      } else {
        throw new Error();
      }
    } else {
      console.log("---------token not verifed---------");
      throw new Error("Not a right user");
    }
  } catch (error) {
    console.log("-------verification failed-----------");
    if (!ReferenceError) {
      res.status(401).json({ error: error.message });
    }
    res.status(401).json({ error: "User not found or JWT expired" });
  }
};
