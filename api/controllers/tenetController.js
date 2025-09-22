const asyncHandler = require('express-async-handler')
const Tenet = require('../models/tenetModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../middlewares/apiError')
// desc : get all tenets
// path : api/tenet
//acess : public

const getTenet = asyncHandler(async (req, res) => {
    const tenet = await Tenet.find()
    res.status(200).json({ messaage: "all tenets", tenet })
})

const createTenet = asyncHandler(async (req, res) => {
    console.log(req.body, "create tenet")
    const { companyName, phone, email, address, website, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(salt)
    console.log(hashedPassword)
    if (!password || password.length < 8 || password.length > 30) throw new ApiError(400, "Passwords must be between 8 and 30 charecters");
    const tenet = await Tenet.create({
        companyName,
        phone,
        email,
        password: hashedPassword,
        address,
        website
    })
    res.status(200).json({ tenet })
})

const getTenetById = asyncHandler(async (req, res) => {
    const id = req?.params?.id
    const tenet = await Tenet.findById(req?.params?.id)
    if (!tenet) throw new ApiError(400, "Tenets by this Id Not found")

    res.status(200).json(tenet)
})

const updateTenet = asyncHandler(async (req, res) => {
    const id = req?.params?.id
    const tenet = await Tenet.findById(req?.params?.id)
    if (!tenet) throw new ApiError(400, "Tenets by this Id Not found")

    const updated = await Tenet.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    res.status(200).json(updated)
})

const flagTenet = asyncHandler(async (req, res) => {
    res.status(200).json({ messaage: `flag tenet  id ${req.params.id}` })
})

const loginTenet = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError("email and password is required")
    }
    const tenet = await Tenet.findOne({ email })
    if (tenet && (await bcrypt.compare(password, tenet.password))) {
        const accessToken = jwt.sign({
            user: {
                email: tenet?.email,
                _id: tenet?._id,
                role: "Admin"
            },
        },
            process.env.TENET_ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )
        const refreshToken = jwt.sign({
            user: {
                email: tenet?.email,
                _id: tenet?._id,
                role: "Admin"
            }
        },
            process.env.TENET_REFRESH_TOKEN_SECRET,
            { expiresIn: "24h" }

        )
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000

        })
        res.status(200).json({ message: "Tenet Succesfully logined", Token: accessToken,id:tenet?._id })
    } else {
        res.status(401).json({ message: "Authentication Failed" })
    }

})

const tenetRefreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.status(401).json({ messaage: "No Refresh Token" })
    jwt.verify(token, process.env.TENET_REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalide Refresh Token" })
        const newAccessToken = jwt.sign(
            { user: { email: decoded?.user?.email, _id: decoded?.user?._id, role: decoded?.user?.admin } },
            process.env.TENET_ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )
        res.json({ accessToken: newAccessToken })
    });
});

module.exports = { getTenet, createTenet, getTenetById, updateTenet, flagTenet, loginTenet,tenetRefreshToken }