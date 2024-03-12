const { CategoryController } = require("../../http/controllers/admin/category.controller")

const router = require("express").Router()

router.post("/add", CategoryController.add)
router.get("/parents", CategoryController.getParents)
router.get("/all", CategoryController.getAll)
router.get("/children/:categoryId", CategoryController.getChildrenOfParent)
router.delete("/:categoryId", CategoryController.remove)

module.exports = {
    CategoryRoutes: router
}