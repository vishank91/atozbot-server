const mongoose = require("mongoose")

const TextSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requied: [true, "User Id is Mendatory"]
    },
    title: {
        type: String,
        default: ""
    },
    chats: []
}, { timestamps: true })
const Text = new mongoose.model("Text", TextSchema)

module.exports = Text