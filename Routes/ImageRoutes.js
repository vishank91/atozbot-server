const ImageRouter = require("express").Router()
const {
    createRecord,
    getRecord,
    getSingleRecord,
    deleteRecord
} = require("../Controllers/ImageController")
ImageRouter.post("", createRecord)
ImageRouter.get("/user/:userid", getRecord)
ImageRouter.get("/:_id", getSingleRecord)
ImageRouter.delete("/:_id", deleteRecord)

module.exports = ImageRouter