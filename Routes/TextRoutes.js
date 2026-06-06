const TextRouter = require("express").Router()
const {
    createRecord,
    getRecord,
    getSingleRecord,
    deleteRecord
} = require("../Controllers/TextController")
TextRouter.post("", createRecord)
TextRouter.get("/user/:userid", getRecord)
TextRouter.get("/:_id", getSingleRecord)
TextRouter.delete("/:_id", deleteRecord)

module.exports = TextRouter