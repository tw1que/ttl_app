const jwt = require('jsonwebtoken')
require('dotenv').config()

 function jwtGenerator (user_id) {
    // const payload = {
    //     user_id: user_id,
    // }
    return jwt.sign({user_id}, process.env.ACCESS_TOKEN_SECRET , {expiresIn: "8hr"})
 }

 module.exports = jwtGenerator