const Product = require("../../models/product.model");
const ProductHelper = require("../../helpers/product");
// [GET] /
module.exports.index = async (req, res) =>{
    // Lấy ra sản phẩm nổi bật
    const productFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active",
    }).limit(6);
    const newProductsFeatured = ProductHelper.priceNewProducts(productFeatured);
    // Hết lấy ra sản phẩm nổi bật

    // Hiển thị danh sách sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active",
    }).sort({position: "desc"}).limit(6);

    const newProductsNew = ProductHelper.priceNewProducts(productsNew);
    // Hết hiển thị danh sách sản phẩm mới nhất

    
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productFeatured: newProductsFeatured,
        productsNew: newProductsNew
    });
}