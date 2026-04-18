const UserRouter = require("express").Router()
const {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    login,
    forgetPassword1,
    forgetPassword2,
    forgetPassword3,
} = require("../controllers/UserController")

UserRouter.post("", createRecord)
UserRouter.get("", getRecord)
UserRouter.get("/:_id", getSingleRecord)
UserRouter.put("/:_id", updateRecord)
UserRouter.delete("/:_id", deleteRecord)
UserRouter.post("/login", login)
UserRouter.post("/forget-password-1", forgetPassword1)
UserRouter.post("/forget-password-2", forgetPassword2)
UserRouter.post("/forget-password-3", forgetPassword3)

module.exports = UserRouter