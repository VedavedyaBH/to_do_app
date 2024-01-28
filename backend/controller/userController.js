const userServices = require("../services/userService");
const token = require("../services/jwtTokenService");
const zod = require("zod");

exports.getUserbyId = async (req, res) => {

  try {
    const id = req.params.id;
    const userData = await userServices.getUserById({ id: id });

    if (!userData) {
      return res.status(404).send({ error: "User not found!" });
    }
    return res.status(200).json({
      userData,
    });
  } catch (error) {
    return res.status(400).send({
      error: error.message,
    });
  }
};

exports.getUserbyName = async (req, res) => {

  const schema = zod.string();

  try {
    const username = req.header("username");
    const validationResult = schema.safeParse(username);

    if (validationResult.error) {
      return res.status(400).send({ error: validationResult.error.message });
    }

    const userData = await userServices.getUserByName({ username });

    if (!userData) {
      return res.status(404).send({ error: "User not found!" });
    }

    return res.status(200).json({
      userData,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

exports.getUserIdbyName = async (req, res) => {
  const schema = zod.object({
    username: zod.string(),
  });
  try {
    const { username } = req.body;
      "Hellpppppppppppppppppppooooooooooooooooooooooooooooooooooooooo"
    );


    const validationResult = schema.safeParse({ username });

    if (validationResult.error) {
      return res.status(400).send({ error: validationResult.error.message });
    }

    const userid = await userServices.getUserIdByName({
      username: username,
    });

    if (!userid) {
      return res.status(404).send({ error: "User not found!" });
    }

    return res.status(200).json({ userid });
  } catch (error) {
    return res.status(400).send({
      error: error.message,
    });
  }
};

exports.createNewUser = async (req, res) => {

  const schema = zod.object({
    username: zod.string(),
    password: zod.string().min(8),
  });

  try {
    const { username, password } = req.headers;

    const validateInputs = schema.safeParse({ username, password });


    if (validateInputs.error) {
      return res.status(400).send({ error: validateInputs.error.message });
    }


    const userData = await userServices.createNewUser({
      username: username,
      password: password,
    });

    if (!userData) {
      return res.status(404).send({ error: "User not created!" });
    }

    if (userData) {
      const id = await userServices.getUserIdByName({ username: username });
      const genToken = await token.createToken({ id: id });
      return res.status(200).json({ genToken });
    }
  } catch (error) {
    return res.status(400).send({
      error: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {

  try {
    const user = req.body;
    const user_data = await userServices.userLogin({
      username: user[0].username,
      password: user[0].password,
    });

    if (!user_data) {
      return res.status(404).send({ error: "Wrong" });
    }

    if (user_data) {
      const id = await userServices.getUserIdByName({
        username: user[0].username,
      });
      const genToken = await token.createToken({ id: id });
      return res.status(200).json({ genToken });
    }
  } catch (error) {
    return res.status(400).send({
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {

  try {
    const user_id = req.params.id;

    const data = await userServices.deleteUser({ user_id: user_id });

    if (!data) {
      return res.status(404).send({ error: "User not found!" });
    }
    return res.status(200).send({
      data: data,
    });
  } catch (error) {
    return res.status(400).send({
      error: error.message,
    });
  }
};
