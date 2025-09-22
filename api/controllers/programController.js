const asyncHandler = require('express-async-handler')
const Programs = require('../models/programModels')
const ApiError = require('../middlewares/apiError')

const getProgram = asyncHandler(async (req, res) => {
    const Data = await Programs.find({ companyId: req._id })
    res.status(200).json({ message: "The Programs list", Data })
})

const getSingleProgram = asyncHandler(async (req, res) => {
    const id = req?.params?.id;
    const chekingExist = await Programs.findOne({ _id:id, companyId: req._id })
    console.log(chekingExist, "the exist")
    if (!chekingExist) throw new ApiError(400, "Programs by this Id Not found")

    res.status(200).json({ message: `Get a program ${id}`, chekingExist })

})
const createProgram = asyncHandler(async (req, res) => {
    const id = req._id
    const { programName, cashbackPercentage, minimumAmt, expiryDate, advanceCashback, termsCondition, multipleUser } = req.body
    const createdProgram = await Programs.create({
        programName, cashbackPercentage, minimumAmt, advanceCashback, expiryDate, termsCondition, multipleUser, companyId: id
    })
    res.status(200).json(createdProgram)

})
const updateProgram = asyncHandler(async (req, res) => {
    const id = req?.params?.id
    const findprogram = await Programs.findById(id)
    if (findprogram.companyId.toString() !== req._id) {
        throw new ApiError(401,"You Dont have Acess to Update this Program")
    }
    if (!findprogram) throw new ApiError(400, "Programs by this Id Not found")
    const updatedProgram = await Programs.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    )
    res.status(200).json({ message: `Program Updated Successfully`, data: updatedProgram })
})

module.exports = { getProgram, getSingleProgram, createProgram, updateProgram }

