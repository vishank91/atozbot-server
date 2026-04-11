const SettingRouter = require("express").Router()
const {
    createRecord,
    getRecord
} = require("../Controllers/SettingController")
SettingRouter.post("", createRecord)
SettingRouter.get("", getRecord)

module.exports = SettingRouter