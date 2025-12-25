const Product = require("../../models/product.model");
const ProductHelper = require("../../helpers/product");
// [GET] /products
module.exports.index = async (req, res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newPrice = ProductHelper.priceNewProducts(products)
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
