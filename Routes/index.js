const Router = require("express").Router()

const { model } = require("mongoose")
const FeatureRouter = require("./FeatureRoutes")
const FaqRouter = require("./FaqRoutes")
const PricingRouter = require("./PricingRoutes")
const SettingRouter = require("./SettingRoutes")

Router.use("/feature", FeatureRouter)
Router.use("/faq", FaqRouter)
Router.use("/pricing", PricingRouter)
Router.use("/setting", SettingRouter)

module.exports = Router