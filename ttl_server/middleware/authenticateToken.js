require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!authHeader) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403)
        req.user_id = payload.user_id
        next()
    })
}