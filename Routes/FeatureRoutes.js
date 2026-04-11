const FeatureRouter = require("express").Router()
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../Controllers/FeatureController")
FeatureRouter.post("", createRecord)
FeatureRouter.get("", getRecord)
FeatureRouter.get("/:_id", getSingleRecord)
FeatureRouter.put("/:_id", updateRecord)
FeatureRouter.delete("/:_id", deleteRecord)

module.exports = FeatureRouter