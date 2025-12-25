const Product = require("../../models/product.model");
const ProductCategory = require("../../models/products-category.model");
const ProductHelper = require("../../helpers/product");
const ProductCategoryHelper = require("../../helpers/products-category");
// [GET] /products
module.exports.index = async (req, res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newPrice = ProductHelper.priceNewProducts(products);
    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newPrice
    });
};

// [GET] /products/:slug
module.exports.detail = async (req, res) =>{
    try{
        const find = {
            deleted: false,
            slug: req.params.slug
        }
    
        const product = await Product.findOne(find);
        console.log(product);
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
        }catch(error){
            res.redirect(`/products`);
        }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) =>{
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        deleted: false,
        status: "active",
    });

    const listSubCategory = await ProductCategoryHelper.getSubCategory(category.id);

    const listSubCategoryId = listSubCategory.map(item => item.id);
    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listSubCategoryId]},
        deleted: false,
        status: "active",
    }).sort({posiion: "desc"});

    const newPrice = ProductHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newPrice
    });
}

