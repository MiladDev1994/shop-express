const { default: getVideoDurationInSeconds } = require("get-video-duration")
const { videoUpload } = require("../../utils/multer")
const { BlogRoutes } = require("./blog")
const { CategoryRoutes } = require("./category")
const { ProductRoutes } = require("./product")
const path = require("path")
const { getVideoDuration } = require("../../utils/functions")

const router = require("express").Router()

router.use("/category", CategoryRoutes)
router.use("/blog", BlogRoutes) 
router.use("/product", ProductRoutes) 
router.use("/get_video", videoUpload.single("video"), async (req, res, next) => {
    const {fileUploadPath, fileName} = req.body
    const videoAddress = path.join(fileUploadPath, fileName).replaceAll("\\", "/")
    const videoURL = "http://localhost:3000/" + path.join(fileUploadPath, fileName).replaceAll("\\", "/")
    const second = await getVideoDurationInSeconds(videoURL)
    const duration = getVideoDuration(second)
    res.status(200).json({duration})
}) 

module.exports = {
    AdminRoutes: router
}