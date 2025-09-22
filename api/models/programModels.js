const mongoose = require('mongoose')
mongoose.pluralize(null)
const { Schema }  = mongoose

const ProgramShema = new Schema({
    programName: {
        unique:true,
        required: [true, "Program Name is required"],
        type: String,
        trim: true,
        minLength: [3, "Company name must be at least 3 characters"],
        maxLength: [30, "Company name cannot exceed 30 characters"],
    },
    cashbackPercentage: {
        required: [true, "Must specify the program Percentage"],
        type: Number,
        min: [1, "The minimum discount percentage should be 1"],
        max: [100, "The maximum discount percentage should be 100 "]
    },
    minimumAmt: {
        required: [true, "Must specify the minimum amoutnt limit for the program "],
        type: Number,
        min: [0, "The minimum amout for the program is 0"],
        max: [1000, "The maximum amout for the program is 1000 "]
    },
    expiryDate: {
        required: [true, "You must specify the expiry Date of the program"],
        type: Date,
        min: [() => new Date(), 'Expiry date ({VALUE}) cannot be in the past.']
    },
    multipleUser: {
        default: true,
        type: Boolean,
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Tenet',
        required: [true, "The company id is required"],
        index: true
    },
    termsCondition: {
        type: String,
        trim: true,
        minLength: [3, "Terms & Condition must be at least 3 characters"],
        maxLength: [255, "Terms & Condition  cannot exceed 255 characters"],
    }, advanceCashback: {
        type: Number,
        min: [0, "The minimum amout for the advance cashback is 0"],
        max: [1000, "The maximum amout for the advance cashback is 1000 "]
    }
}, { timestamps: true, versionKey: false })

ProgramShema.pre('save', function (next) {
    if (this.termsCondition) {
        this.termsCondition = this.termsCondition
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
    next();
});

module.exports = mongoose.model('Programs',ProgramShema)