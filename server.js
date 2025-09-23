const express = require('express')
const ConnectDb = require('./api/config/dbConnnection')
const errorHandler = require('./api/middlewares/errorHandler')
const cors = require('cors')
require('dotenv').config()

ConnectDb()
const app = express()

const port = process.env.PORT || 4000

const allowedOrigins = [
    'http://localhost:5175', // Example: your frontend development server
    'http://localhost:5173', // Example: your frontend development server
    'http://localhost:3000', // Example: your frontend development server
    'https://your-production-frontend.com' // Example: your live site
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow REST tools or same origin requests
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin); // Reflect the requested origin
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },    credentials: true, // This is important if you're using cookies or sessions
};

// Use the cors middleware with the configured options
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tenet', require('./api/routes/tenetRoutes'))
app.use('/api/program', require('./api/routes/programRoutes'))
app.use('/api/product', require('./api/routes/productRoutes'))
app.use(errorHandler)

console.log(process.env.NODE_ENV)
app.listen(port, () => console.log(`Server running on ${port}`));

