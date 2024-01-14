const db = require("./knex")()
const uuid = require("uuid")

exports.getAllTo_dos = async ({ user_id: user_id }) => {
    try {
        const to_doData = await db("to_do")
            .select("*")
            .where("user_id", user_id)

        if (JSON.stringify(to_doData) === null) {
            throw new ReferenceError
        }

        return to_doData;


    } catch (error) {
        if (!ReferenceError)
            throw new Error('Failed to fetch to_dos')
        else
            throw ("Nothing found")
    }
}

exports.createTo_dos = async (user_id, to_do) => {
    try {
        const to_doData = await db("to_do")
            .insert({
                id: uuid.v4(),
                title: to_do[0].title,
                description: to_do[0].description,
                user_id: user_id
            })

        return to_doData;


    } catch (error) {
        throw new Error(error.message)
    }
}