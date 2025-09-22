const express = require('express')
const ConnectDb = require('./api/config/dbConnnection')
const errorHandler = require('./api/middlewares/errorHandler')
require('dotenv').config()

ConnectDb()
const app = express()

const port = process.env.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tenet', require('./api/routes/tenetRoutes'))
app.use('/api/program', require('./api/routes/programRoutes'))
app.use('/api/product', require('./api/routes/productRoutes'))
app.use(errorHandler)

console.log(process.env.NODE_ENV)
app.listen(port, () => console.log(`Server running on ${port}`));

