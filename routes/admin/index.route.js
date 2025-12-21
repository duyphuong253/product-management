const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const systermConfig = require("../../config/system");
const productCategoryRoutes = require("./products-category.route");
const roleRoutes = require("./role.route");


module.exports = (app) =>{

    const PATH_ADMIN = systermConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);

    app.use(PATH_ADMIN + "/products", productRoutes);

    app.use(PATH_ADMIN + "/products-category", productCategoryRoutes);

    app.use(PATH_ADMIN + "/roles", roleRoutes);

}

