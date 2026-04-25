const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: [true, "Full Name Field is Mendatory"]
    },
    username: {
        type: String,
        unique: true,
        requied: [true, "Username Field is Mendatory"]
    },
    email: {
        type: String,
        unique: true,
        requied: [true, "Email Address is Mendatory"]
    },
    phone: {
        type: String,
        requied: [true, "Phone Number is Mendatory"]
    },
    password: {
        type: String,
        requied: [true, "Password Field is Mendatory"]
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pricing",
        default: null
    },
    planDetails: {
        type: Object,
        default: {}
    },
    role: {
        type: String,
        default: "User"
    },
    status: {
        type: Boolean,
        default: true
    },
})
const User = new mongoose.model("User", UserSchema)

module.exports = User