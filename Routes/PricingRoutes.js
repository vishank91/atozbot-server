const PricingRouter = require("express").Router()
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../Controllers/PricingController")
PricingRouter.post("", createRecord)
PricingRouter.get("", getRecord)
PricingRouter.get("/:_id", getSingleRecord)
PricingRouter.put("/:_id", updateRecord)
PricingRouter.delete("/:_id", deleteRecord)

module.exports = PricingRouter