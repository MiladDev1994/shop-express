
const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controllers");
const { addCategorySchema, updateCategorySchema } = require("../../middleware/validator/admin/category.schema");
const { Types } = require("mongoose");

class CategoryController extends Controller {

    async add(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body)
            const {title, parent} = req.body;
            const category = await CategoryModel.create({title, parent})
            if (!category)  throw createHttpError.InternalServerError() 
            return res.status(201).json({
                data: category,
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
            await CategoryModel.deleteMany({$or: [
                {_id: categoryId},
                {parent: categoryId},
            ]})
            return res.status(201).json({
                message: "deleted"
            })
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            await updateCategorySchema.validateAsync(req.body)
            const {categoryId} = req.params;
            const {title} = req.body;
            const existCategory = await this.checkExistCategory(categoryId)
            const updated = await CategoryModel.updateOne({_id: categoryId}, {$set: {title}})
            if (updated.modifiedCount == 0) throw createHttpError.InternalServerError()
            return res.status(201).json({message: "updated"})
            
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            // فقط تا یک لول دیتا بهمون میده
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "_id",
            //             foreignField: "parent",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0,
            //         },
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ])

            // همه رو بهمون میده ولی تمامی سطوح رو میریزه تو سطح دوم
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $graphLookup: {
            //             from: "categories",
            //             startWith: "$_id",
            //             connectFromField: "_id",
            //             connectToField: "parent",
            //             maxDepth: 5,
            //             depthField: "depth",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0,
            //         },
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ])

            const categories = await CategoryModel.find({parent: undefined}, {__v: 0})

            return res.status(201).json(categories)

        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const {categoryId} = req.params;
            console.log(categoryId)
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
                        _id: new Types.ObjectId(categoryId)
                    }
                }
            ])
            return res.status(201).json(categories)

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