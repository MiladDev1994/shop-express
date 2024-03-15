const { BlogController } = require("../../http/controllers/admin/blog.controller")
const { stringToArray } = require("../../http/middleware/stringToArray")
const { fileUpload } = require("../../utils/multer")

const router = require("express").Router()

router.post("/add", fileUpload.single("image"), stringToArray("tags"), BlogController.create)
router.get("/:blogId", BlogController.getById)
router.delete("/:blogId", BlogController.delete)
router.get("/", BlogController.getAll)

module.exports = {
    BlogRoutes: router
}