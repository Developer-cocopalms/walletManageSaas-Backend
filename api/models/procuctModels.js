const mongoose = require('mongoose')
mongoose.pluralize(null)

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
        required: [true, "Product Name is Required"],
        unique: true,
        type: String,
        trim: true,
        lowercase:true,
    },
    productModel: {
        required: [true, "Product Model is Required"],
        type: String,
    },
    serviceType: {
        required: [true, "Service Type is Required"],
        type: String,
        enum: ["chauffeur", "self-drive"],
    },
    duration: {
        required: [true, "Prodcut Duration is required"],
        type:String,
    },
    notes: {
        type: String,
        minlength: [3, "minimum 3 charecters are required"],
        maxlength: [255, "maximum 255 charecters are allowed"],
        trim:true,
    },
    companyId: {
        type: Schema.Types.ObjectId,
        required: [true, "Company id is required"],
        ref: 'Tenet',
        index:true,
    },
    isActive: {
        type: Boolean,
        required: [true, "Prouct Active is to be filled"],
        default:true
    },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("Product",productSchema)