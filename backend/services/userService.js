const db = require("./knex")()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')


exports.getUserById = async ({ user_id }) => {
    try {
        const user_data = await db("user")
            .select("*")
            .where("id", user_id)

        return user_data[0];

    } catch (error) {
        throw new Error('Failed to fetch user')

    }
}

exports.getUserByName = async ({ username }) => {
    try {

        const user_data = await db("user")
            .select("*")
            .where("user_name", username)
        console.log("Hii")
        return user_data[0];

    } catch (error) {
        throw new Error('Failed to fetch user')

    }
}

exports.createNewUser = async ({ username, password }) => {
    try {
        const existingUser = await this.getUserByName({ username })

        if (existingUser) {
            throw new ReferenceError
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user_data = await db("user")
            .insert({
                id: uuid.v4(),
                user_name: username,
                password: hashedPassword
            })

        return user_data;

    } catch (error) {
        if (ReferenceError) {
            throw new Error('Use diff username')
        }
        throw new Error('Failed to create a user')
    }
}

exports.userLogin = async ({ username, password }) => {
    try {
        const user = await this.getUserByName({ username })
        console.log("Hii")
        if (!user) {
            return
        }
        console.log("Hii")
        const validUser = await bcrypt.compare(password, user.password)
        console.log(validUser)
        if (!validUser) {
            return
        }
        return validUser

    } catch (error) {
        throw new Error('Failed to login')
    }
}

exports.deleteUser = async ({ user_id }) => {
    try {

        const user_data = await db("user")
            .delete()
            .where("id", user_id)

        return user_data;
    }

    catch (error) {
        throw new Error('Failed to login')

    }
}
