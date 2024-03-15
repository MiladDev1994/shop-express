const path = require("path")
const { CreateBlogSchema } = require("../../middleware/validator/admin/blog.schema");
const Controller = require("../controllers");
const {BlogModel} = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const createHttpError = require("http-errors");


class BlogController extends Controller {
    async create(req, res, next) {
        try {
            // console.log(req.body)
            const blogDataBody = await CreateBlogSchema.validateAsync(req.body)
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.fileName).replaceAll("\\", "/")
            const {title, text, short_text, fileName, tags, category, fileUploadPath} = blogDataBody
            const {image} = req.body
            const author = req.user._id
            const blog = await BlogModel.create({
                author, 
                title, 
                text, 
                short_text, 
                fileName, 
                tags, 
                category, 
                fileUploadPath,
                image
            })
            res.status(200).send(blog)
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const {blogId} = req.params
            const blog = await BlogModel.findById(blogId)
            return res.status(200).send(blog)
        } catch (error) {
            next(error)
        }
    }
    
    async getAll(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {$match: {}},
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {$unwind: "$author"},
                {
                    $project: {
                        "author._id": 0,
                        "author.bills": 0,
                        "author.roles": 0,
                        "author.otp": 0,
                        "author.__v": 0,
                    }
                },

                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $project: {
                        "category.__v": 0,
                    }
                },
            ])
            res.status(200).send(blogs)
            
        } catch (error) {
            next(error)
        }
    }
    
    async getComment(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    
    async delete(req, res, next) {
        try {
            const {blogId} = req.params
            const existBlog = await BlogModel.findById(blogId)
            if (!existBlog) throw createHttpError.NotFound("blog not found") 
            const blog = await BlogModel.deleteOne({_id: blogId})
            if (blog.deletedCount == 0) throw createHttpError.InternalServerError()
            deleteFileInPublic(existBlog.image)
            return res.status(200).send({message: "deleted"})
            
        } catch (error) {
            next(error)
        }
    }
    
    async update(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    BlogController: new BlogController()
}