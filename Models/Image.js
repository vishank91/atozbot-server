const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requied: [true, "User Id is Mendatory"]
    },
    chat: []
}, { timestamps: true })
const Image = new mongoose.model("Image", ImageSchema)

module.exports = Image