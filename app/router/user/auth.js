const { UserController } = require("../../http/controllers/user/auth/auth.controller")

const router = require("express").Router()

router.post("/get-otp", UserController.getOtp)
router.post("/check-otp", UserController.checkOtp)
router.post("/refresh-token", UserController.refreshToken)

module.exports = {
    UserAuthRoutes: router
}