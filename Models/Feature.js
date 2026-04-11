const mongoose = require("mongoose")

const FeatureSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        requied: [true, "Feature Name is Mendatory"]
    },
    icon: {
        type: String,
        requied: [true, "Feature Icon is Mendatory"]
    },
    shortDescription: {
        type: String,
        requied: [true, "Feature Short Description is Mendatory"]
    },
    status: {
        type: Boolean,
        default: true
    },
})
const Feature = new mongoose.model("Feature", FeatureSchema)

module.exports = Feature