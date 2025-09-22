const asyncHandler = require('express-async-handler')
const Product = require('../models/procuctModels')
const { findOne } = require('../models/tenetModels')
const ApiError = require('../middlewares/apiError')


const getProducts = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({ companyId: req?._id })
    res.status(201).json({ message: "All Products", Products: allProducts })
})


const getSigleProducts = asyncHandler(async (req, res) => {
    const paramsId = req?.params?.id
    const chekingExist = await Product.findOne({ _id: paramsId, comapany_id: req._id })
    if (!chekingExist) throw new Error(401, "Program Id Not found")
    res.status(201).json({ message: chekingExist, })
})


const createProduct = asyncHandler(async (req, res) => {
    const companyid = req._id
    console.log(companyid, "this is the comany id")
    const { productName, productModel, serviceType, duration, notes, isActive } = req.body
    const createdProduct = await Product.create({
        productName,
        productModel,
        serviceType,
        duration,
        companyId: companyid,
        notes,
        isActive
    })
    res.status(201).json({ message: "Product Created", Product: createdProduct })
})
const updateProduct = asyncHandler(async (req, res) => {
    const paramsId = req?.params?.id
    const comapany_id = req?._id
    const checkExist = await Product.findOne({ _id: paramsId, companyId: comapany_id })
    if (!checkExist) throw new ApiError(400, "Product Id not found")
    if (checkExist.companyId.toString() !== req._id) throw new ApiError(403, "This user does not Access to update this Product")
    const updatedProduct = await Product.findByIdAndUpdate(
        paramsId,
        req.body,
        { new: true, runValidators: true }
    )
    res.status(201).json({ message: "All Products", product: updatedProduct })
})


module.exports = { getProducts, getSigleProducts, createProduct, updateProduct }