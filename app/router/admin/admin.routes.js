const { BlogRoutes } = require("./blog")
const { CategoryRoutes } = require("./category")

const router = require("express").Router()

router.use("/category", CategoryRoutes)
router.use("/blog", BlogRoutes) 

module.exports = {
    AdminRoutes: router
}