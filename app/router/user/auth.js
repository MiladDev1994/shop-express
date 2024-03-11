const { UserController } = require("../../http/controllers/user/auth/auth.controller")

const router = require("express").Router()

router.post("/login", UserController.login)

module.exports = {
    UserAuthRoutes: router
}