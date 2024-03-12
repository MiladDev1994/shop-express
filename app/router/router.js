const { AdminRoutes } = require("./admin/admin.routes")
const { HomeRoutes } = require("./api")
const { UserAuthRoutes } = require("./user/auth")

const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserAuthRoutes)
router.use("/admin", AdminRoutes)

module.exports = {
    AllRoutes: router
}