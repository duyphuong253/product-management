const express = require("express")
const router = express.Router();
const multer = require("multer");

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/products-category.controller");

const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.get("/create", controller.create);
    
router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);

module.exports = router;


