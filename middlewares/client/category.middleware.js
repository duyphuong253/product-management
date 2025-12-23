const ProductCategory = require("../../models/products-category.model");
const createTreeHelper = require("../../helpers/create-tree");

module.exports.category = async(req, res, next) => {
    const productCategory = await ProductCategory.find({
        deleted: false
    });

    const newProductCategory = createTreeHelper.createTree(productCategory);

    res.locals.category = newProductCategory;
    next();
}