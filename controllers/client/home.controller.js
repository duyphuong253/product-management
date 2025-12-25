const Product = require("../../models/product.model");
const ProductHelper = require("../../helpers/product");
// [GET] /
module.exports.index = async (req, res) =>{
    // Lấy ra sản phẩm nổi bật
    const productFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active",
    });

    const newProducts = ProductHelper.priceNewProducts(productFeatured);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productFeatured: newProducts,
    });
}