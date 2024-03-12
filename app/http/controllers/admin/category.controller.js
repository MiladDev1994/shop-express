
const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controllers");
const { addCategorySchema } = require("../../middleware/validator/admin/category.schema");
const { Types } = require("mongoose");

class CategoryController extends Controller {
    async add(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body)
            const {title, parent} = req.body;
            const category = await CategoryModel.create({title, parent})
            if (!category)  throw createHttpError.InternalServerError() 
            return res.status(201).json({
                message: "category created"
            })

        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const {categoryId} = req.params;
            const existCategory = await this.checkExistCategory(categoryId)
            if (!existCategory) return next(createHttpError.NotFound("category not found"))
            await CategoryModel.deleteOne({_id: categoryId})
            return res.status(201).json({
                message: "deleted"
            })
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0,
                    },
                },
                {
                    $match: {
                        parent: undefined
                    }
                }
            ])
            return res.status(201).json(categories)

        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getParents(req, res, next) {
        try {
            const categories = await CategoryModel.find({parent: undefined}, {__v: 0});
            if (!categories) throw createHttpError.InternalServerError() 
            return res.status(201).json(categories)
        } catch (error) {
            next(error)
        }
    }

    async getChildrenOfParent(req, res, next) {
        try {
            const {categoryId} = req.params;
            const category = await CategoryModel.find({parent: categoryId}, {__v: 0});
            if (!category) throw createHttpError.InternalServerError() 
            return res.status(201).json(category)
            
        } catch (error) {
            next(error)
        }
    }

    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id)
        return !!category
    }
}

module.exports = {
    CategoryController: new CategoryController()
}