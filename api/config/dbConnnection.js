const mongoose = require('mongoose')
const ApiError = require('../middlewares/apiError')

const ConnectDb = async () => {
    try {
        console.log("in db")
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database Connected", connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log("Database Connection Failed",error)
        process.exit(1)
    }
}

module.exports = ConnectDb;