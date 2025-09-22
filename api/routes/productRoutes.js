const express = require('express')
const { getProducts, createProduct, updateProduct } = require('../controllers/productController')
const verifyTenet = require('../middlewares/verifyTenet')

const router = express.Router()
router.use(verifyTenet)
router.route("/").get(getProducts).post(createProduct)
router.route("/:id").get(updateProduct).put(updateProduct)

module.exports = router