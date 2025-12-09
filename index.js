const express = require("express");

require("dotenv").config();

const route = require("./routes/client/index.route");

const database = require("./config/database.js");
database.connect();

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

// Cấu hình để sử dụng pug
app.set("views", "./views");
app.set("view engine", "pug");

//Routes
route(app);

app.listen(port, () =>{
    console.log(`App listening on port ${port}`);
})