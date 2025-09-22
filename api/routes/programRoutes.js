const express = require('express')
const { getProgram, getSingleProgram, createProgram, updateProgram } = require('../controllers/programController')
const verifyTenet = require('../middlewares/verifyTenet')

const router = express.Router()
router.use(verifyTenet)
router.route("/").get(verifyTenet,getProgram).post(createProgram)
router.route("/:id").get(getSingleProgram).put(updateProgram)


module.exports = router;