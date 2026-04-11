const mongoose = require("mongoose")

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        unique: true,
        requied: [true, "Question is Mendatory"]
    },
    answer: {
        type: String,
        requied: [true, "Answer is Mendatory"]
    },
    status: {
        type: Boolean,
        default: true
    },
})
const Faq = new mongoose.model("Faq", FaqSchema)

module.exports = Faq