const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")

const verifyTenet = asyncHandler(async (req, res, next) => {
    let token
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer"))
        token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.TENET_ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("Authorisation Failed")
        }
        req._id = decoded.user?._id
        next()
    });
    if (!token) {
        throw new Error("User is not Authorised or token is missing");
    }
})

module.exports = verifyTenet