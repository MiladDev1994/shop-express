const path = require("path");
const fs = require("fs");
const multer = require("multer");
const createHttpError = require("http-errors");

function createRoute(req) {
    const date = new Date();
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDate().toString()
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "blog", year, month, day);
    req.body.fileUploadPath = path.join("uploads", "blog", year, month, day)
    fs.mkdirSync(directory, {recursive: true})
    return directory;
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = createRoute(req)
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = new Date().getTime() + ext
        if (req.body.fileName) {
            if (typeof req.body.fileName == "string") req.body.fileName = [req.body.fileName, fileName]
            else req.body.fileName.push(fileName)
        } else {
            req.body.fileName = fileName
        }
        cb(null, fileName)
    }
})

function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileFormat = [".jpeg", ".jpg", ".png", ".webp"]
    if (!fileFormat.includes(ext)) return cb(createHttpError.BadRequest("file format is false"))
    return cb(null, true)
}

function videoFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileFormat = [".mp4", ".mkv"]
    if (!fileFormat.includes(ext)) return cb(createHttpError.BadRequest("file format is false"))
    return cb(null, true)
}

const fileUpload = multer({storage, fileFilter, limits: {
    fileSize: 1 * 1000 * 1000 // 1MB
}});

const videoUpload = multer({storage, videoFilter, limits: {
    fileSize: 300 * 1000 * 1000 // 300MB
}});

module.exports = {
    fileUpload,
    videoUpload
}