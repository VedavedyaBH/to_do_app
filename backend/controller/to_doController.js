const to_doServices = require("../services/to_doServices")

exports.getAllTo_dos = async (req, res) => {
    try {
        const user_id = req.header('userid');
        if (!user_id) {
            throw new Error("No user id found")
        }

        const to_doData = await to_doServices.getAllTo_dos({ user_id: user_id });

        if (!to_doData) {
            res.status(404).send("Couldnot retrive")
        }

        res.status(200).send({
            data: to_doData
        })
    } catch (error) {
        res.status(400).send({ Error: error.message })
    }
}

exports.createTo_dos = async (req, res) => {
    try {
        const user_id = req.header("userid");
        const to_do = req.body;
        const to_doData = await to_doServices.createTo_dos(user_id, to_do)

        if (!to_doData) {
            res.status(404).send("Couldnot create")
        }

        res.status(200).send({
            data: to_doData
        })

    } catch (error) {
        res.status(400).send({ Error: error.message })
    }
}

exports.getTo_dos_byId = async (req, res) => {
    try {
        const to_do_id = req.body;
        const user_id = req.header("userid")
        console.log(user_id)

        const to_doData = await to_doServices.getTo_dos_byId(to_do_id, user_id);

        if (!to_doData) {
            res.status(401).send("Could not retreive");
        }

        res.status(200).send({
            data: to_doData
        })

    } catch (error) {
        res.status(400).send({ Error: error.message })
    }
}

exports.updateTo_doById = async (req, res) => {
    try {
        const to_doData = req.body;
        const user_id = req.header('userid');

        const data = await to_doServices.updateTo_doById(to_doData, user_id)

        if (!data) {
            res.status(401).send("Oops!")
        }
        res.status(200).send({
            updatedData: data
        })
    } catch (error) {
        res.status(400).send({ Error: error.message })
    }
}

exports.deleteto_doById = async (req, res) => {
    try {
        const to_do_id = req.body;
        const user_id = req.header("userid");

        const data = await to_doServices.deleteto_doById(to_do_id, user_id);

        if (!data) {
            res.status(401).send("Could not delete")
        }

        res.status(200).send("Deleted")

    } catch (error) {
        res.status(400).send({ Error: error.message })
    }
}