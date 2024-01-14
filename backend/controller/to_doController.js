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