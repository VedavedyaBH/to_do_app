const db = require("./knex")()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')


exports.getUserById = async ({ id }) => {
    try {
        const user_data = await db("user")
            .select("*")
            .where("id", id)

        return user_data[0];

    } catch (error) {
        throw new Error('Failed to fetch user')

    }
}

exports.getUserIdByName = async ({ username: username }) => {
    try {
        const user_data = await db("user")
            .select("id")
            .where("user_name", username)
            
        if (user_data.length > 0) {
            return user_data;
        }
        else
            return false;

    }
    catch (error) {
        throw new Error('Failed to fetch')

    }
}

exports.getUserByName = async ({ username }) => {
    try {
        const user_data = await db("user")
            .select("*")
            .where("user_name", username)
        return user_data[0];

    } catch (error) {
        throw new Error('Failed to fetch user')

    }
}


exports.createNewUser = async ({ username: username, password: password }) => {
    try {
        const existingUser = await this.getUserIdByName({ username: username })

        if (existingUser.length >= 0) {
            throw new ReferenceError
        }

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10)

            const user_data = await db("user")
                .insert({
                    id: uuid.v4(),
                    user_name: username,
                    password: hashedPassword
                })
            return user_data;
        }

    } catch (error) {

        if (!ReferenceError) {
            throw new Error('Failed to create a user')
        }

        throw new Error('Use different username')
    }
}

exports.userLogin = async ({ username, password }) => {
    try {
        const user = await this.getUserByName({ username })

        if (!user) {
            return
        }
        const validUser = await bcrypt.compare(password, user.password)

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
