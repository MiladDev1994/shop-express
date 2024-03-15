const { VerifyAccessToken, checkRole } = require("../http/middleware/verifyAccessToken")
const { AdminRoutes } = require("./admin/admin.routes")
const { HomeRoutes } = require("./api")
const { UserAuthRoutes } = require("./user/auth")
const router = require("express").Router()

router.use("/", HomeRoutes)
router.use("/user", UserAuthRoutes)
router.use("/admin", VerifyAccessToken, checkRole("ADMIN"), AdminRoutes)

module.exports = {
    AllRoutes: router 
}