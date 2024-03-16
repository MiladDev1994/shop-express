const { ProductController } = require("../../http/controllers/admin/product.controller")
const { stringToArray } = require("../../http/middleware/stringToArray")
const { fileUpload } = require("../../utils/multer")
const router = require("express").Router()

router.post("/add", fileUpload.array("images", 10), stringToArray("tags"), ProductController.add)
router.get("/all", ProductController.getAll)
router.get("/:productId", ProductController.getOne)
router.delete("/:productId", ProductController.remove)

module.exports = {
    ProductRoutes: router
}