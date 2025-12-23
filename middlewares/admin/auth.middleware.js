const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
module.exports.requireAuth = async (req, res, next) =>{
    // nếu token không có trong trang dashboard thì sẽ tự logout
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else{
        console.log(req.cookies.token);
        const user = await Account.findOne({ token: req.cookies.token});
        if(!user){
            res.clearCookie("token");
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else{
            next();
        }
    }
    
}