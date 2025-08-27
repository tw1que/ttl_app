const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')

// middleware
app.use(express.json())
app.use(cors())

// routes

// register & login routes
app.use('/auth', require('./routes/jwtAuth'))
app.use('/orders', require('./routes/orders'))

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

if (require.main === module) {
    app.listen(5000, () => {
        console.log("Listening on port 5000")
    })
}

module.exports = app;