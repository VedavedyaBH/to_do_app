const jwt = require('jsonwebtoken');

exports.createToken = async ({ user }) => {
    const user_id = user.id
    console.log(user_id)
    try {
        const token = jwt.sign({ user_id: user_id }, 'your-secret-key', {
            expiresIn: '1h',
        });

        return token

    } catch (error) {
        throw new Error(" Failed to create token")
    }
}


exports.verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        console.log(decoded.user_id)
        console.log("________________________")
        console.log("                  ")

        if (req.header("User") === decoded.user_id) {
            console.log(decoded.user_id)
            next();  
        } else {
            throw new Error("Not a right user")
        }


    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}