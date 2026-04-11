const FaqRouter = require("express").Router()
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../Controllers/FaqController")
FaqRouter.post("", createRecord)
FaqRouter.get("", getRecord)
FaqRouter.get("/:_id", getSingleRecord)
FaqRouter.put("/:_id", updateRecord)
FaqRouter.delete("/:_id", deleteRecord)

module.exports = FaqRouter