const { BlogRoutes } = require("./blog")
const { CategoryRoutes } = require("./category")
const { ProductRoutes } = require("./product")

const router = require("express").Router()

router.use("/category", CategoryRoutes)
router.use("/blog", BlogRoutes) 
router.use("/product", ProductRoutes) 

module.exports = {
    AdminRoutes: router
}