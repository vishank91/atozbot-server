const mongoose = require("mongoose")

const PricingSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        requied: [true, "Pricing Plan Name is Mendatory"]
    },
    shortDescription: {
        type: String,
        requied: [true, "Short Description is Mendatory"]
    },
    basePrice: {
        type: Number,
        requied: [true, "Base Price is Mendatory"]
    },
    discount: {
        type: Number,
        requied: [true, "Discount Field is Mendatory"]
    },
    finalPrice: {
        type: Number,
        requied: [true, "Final Price is Mendatory"]
    },
    description: {
        type: String,
        requied: [true, "Short Description is Mendatory"]
    },
    status: {
        type: Boolean,
        default: true
    },
})
const Pricing = new mongoose.model("Pricing", PricingSchema)

module.exports = Pricing