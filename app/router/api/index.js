const route = require("express").Router()
const HomeController = require("../../http/controllers/api/home.controller")
route.post("/", HomeController.indexPage)
module.exports = {
    HomeRoutes: route
}