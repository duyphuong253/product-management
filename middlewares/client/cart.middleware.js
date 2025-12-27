const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    let cart;

    // Không có cookie
    if (!req.cookies.cartId) {
        cart = new Cart({ products: [] });
        await cart.save();

        const expiresCookie = 365 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        });
    } 
    // Có cookie
    else {
        cart = await Cart.findById(req.cookies.cartId);

        // Cookie có nhưng cart không tồn tại
        if (!cart) {
            cart = new Cart({ products: [] });
            await cart.save();

            const expiresCookie = 365 * 24 * 60 * 60 * 1000;
            res.cookie("cartId", cart.id, {
                expires: new Date(Date.now() + expiresCookie)
            });
        }
    }

    // Lúc này cart CHẮC CHẮN tồn tại
    cart.totalQuantity = cart.products.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    res.locals.miniCart = cart;
    next();
};
