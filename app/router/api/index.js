const route = require("express").Router()
const HomeController = require("../../http/controllers/api/home.controller")
const { VerifyAccessToken } = require("../../http/middleware/verifyAccessToken")
route.get("/", VerifyAccessToken, HomeController.indexPage)
module.exports = {
    HomeRoutes: route
}