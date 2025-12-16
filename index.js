const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require("dotenv").config();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const database = require("./config/database.js");
database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

// Cấu hình để sử dụng express-flash
app.use(cookieParser('keybaomattudinhnghia'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash

// Cấu hình để sử dụng pug
app.set("views", "./views");
app.set("view engine", "pug");

// Tạo ra các biến toàn cục có thể dùng được ở các file .pug
const systemConfig  = require("./config/system.js");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Routes
routeAdmin(app);
route(app);

app.listen(port, () =>{
    console.log(`App listening on port ${port}`);
})