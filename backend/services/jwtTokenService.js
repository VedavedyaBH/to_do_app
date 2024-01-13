const jwt = require('jsonwebtoken');
const userServices = require("../services/userService");

exports.createToken = async ({ id }) => {
    console.log(id)
    try {
        const token = jwt.sign({ user: id }, 'helloFirstTryWithJWT_youCannotHyackMe', {
            expiresIn: '1h',
        });

        return token

    } catch (error) {
        throw new Error(" Failed to create token")
    }
}


exports.verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    const username = req.header('username')
    console.log(token)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'helloFirstTryWithJWT_youCannotHyackMe');
        console.log("________________________")
        console.log("                  ")
        console.log(decoded)

        const id = userServices.getUserIdByName({ username: username })

        if (id === decoded.user.id) {
            next();
        } else {
            throw new Error("Not a right user")
        }


    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}