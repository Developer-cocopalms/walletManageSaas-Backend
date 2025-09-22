const express = require('express')
const { getTenet, createTenet, updateTenet, flagTenet, getTenetById, loginTenet, refreshToken, tenetRefreshToken } = require('../controllers/tenetController')
const router = express.Router()

router.route("/").get(getTenet).post(createTenet)
router.route("/login").post(loginTenet)
router.route("/auth/refresh").post(tenetRefreshToken)
router.route("/:id").get(getTenetById).put(updateTenet)
    // .patch(flagTenet)

module.exports = router;