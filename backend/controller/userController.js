const userServices = require("../services/userService")
const token = require('../services/jwtTokenService')


exports.getUserbyId = async (req, res) => {
    try {
        const user_id = req.params.id;
        const userData = await userServices.getUserById({ user_id: user_id });

        if (!userData) {
            return res.status(404).send({ error: 'User not found!' })
        }
        return res.status(200).send({
            data: userData
        })
    }
    catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.getUserbyName = async (req, res) => {
    try {
        const { username } = req.headers;
        console.log(username)
        const userData = await userServices.getUserByName({ username: username });

        if (!userData) {
            return res.status(404).send({ error: 'User not found!' })
        }
        return res.status(200).send({
            data: userData
        })
    }
    catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.createNewUser = async (req, res) => {
    try {
        const { username, password } = req.headers;
        console.log({ username, password });
        const userData = await userServices.createNewUser({ username: username, password: password });

        if (!userData) {
            return res.status(404).send({ error: 'User not created!' })
        }
        return res.status(200).send({
            message: "Done!"
        })

    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.headers;
        console.log({ username, password });

        const user_data = await userServices.userLogin({ username: username, password: password })

        if (!user_data) {
            return res.status(404).send({ error: 'Wrong' })
        }


        if (user_data) {
            console.log("user_id")
            const user = await userServices.getUserByName({username: username})
            console.log(user.id)
            const genToken = await token.createToken({ user: user })
            console.log(genToken)
            return res.status(200).send({ message: 'logged in' })
        }



    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user_id = req.params.id

        const data = await userServices.deleteUser({ user_id: user_id })

        if (!data) {
            return res.status(404).send({ error: 'User not found!' })
        }
        return res.status(200).send({
            data: data
        })

    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}