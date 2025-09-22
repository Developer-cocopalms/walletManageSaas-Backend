const mongoose = require("mongoose")
mongoose.pluralize(null)
const { Schema } = mongoose

const TenteScehma = new Schema({
    companyName :{
        type: String,
        required: [true, "Company Name is Required"],
        trim: true,
        minLength: [3, "Company name must be at least 3 characters"],
        maxLength: [100, "Company name cannot exceed 100 characters"],
    }, 
    password: {
        required: [true, "Password is Required"],
        type: String, 
        // trim:true,
        // minLength: [8, "Password Must Be 8 Charecters"],
        // maxLength:[30,"Password cannot exceed 30 charecters"]
    },
    phone :{
        type: String,
        required: [true, "Phone Number Is Required"],
        unique: true,
        trim: true,
        match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, "Invalid phone number format"],
    },
    email :{
        type: String,
        required: [true, "Email Id is Required"],
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],             
        },
        address :{
        type: String,
            required: [true, "Adress is Required"],
               trim: true,
            maxLength: [255, "Address cannot exceed 255 characters"]
        },
        website : {
            type:String
        },
        isActive :{
        type: Boolean,
            required: [true, "Please Update Active Status"],
            default:true,
        }
}, { timestamps: true ,versionKey: false })

module.exports = mongoose.model('Tenets',TenteScehma)