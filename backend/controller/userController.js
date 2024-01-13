const userServices = require("../services/userService")
const token = require('../services/jwtTokenService')


exports.getUserbyId = async (req, res) => {
    console.log("---------getUserbyId API triggered---------")

    try {
        const id = req.params.id;
        const userData = await userServices.getUserById({ id: id });

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
    console.log("---------getUserbyName API triggered---------")
    try {
        const username = req.header('username');
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

exports.getUserIdbyName = async (req, res) => {
    console.log("---------getUserIdbyName API triggered---------")
    try {
        const username = req.header('username');
        console.log(username)
        const userData = await userServices.getUserIdByName({ username: username });

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
    console.log("---------userRegistration API triggered---------")

    try {
        const { username, password } = req.headers;

        console.log("------------From CreateNewUser-----------")
        console.log(" ")
        console.log({ username, password });
        console.log("------------From CreateNewUser------------")
        console.log(" ")

        const userData = await userServices.createNewUser({ username: username, password: password });

        if (!userData) {
            return res.status(404).send({ error: 'User not created!' })
        }

        if (userData) {
            const id = await userServices.getUserIdByName({ username: username })
            const genToken = await token.createToken({ id: id })
            console.log(genToken)
            return res.status(200).send({ Token: genToken, message: 'created and logged in' })
        }

    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.userLogin = async (req, res) => {
    console.log("---------userLogin API triggered---------")

    try {
        const { username, password } = req.headers;
        console.log({ username, password });

        const user_data = await userServices.userLogin({ username: username, password: password })

        if (!user_data) {
            return res.status(404).send({ error: 'Wrong' })
        }


        if (user_data) {
            const id = await userServices.getUserIdByName({ username: username })
            const genToken = await token.createToken({ id: id })
            return res.status(200).send({ Token: genToken, message: 'logged in' })
        }



    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    console.log("---------userDelete API triggered---------")

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