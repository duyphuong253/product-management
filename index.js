const express = require("express");

const route = require("./routes/client/index.route");

const app = express();
const port = 3002;

// Cấu hình để sử dụng pug
app.set("views", "./views");
app.set("view engine", "pug");

//Routes
route(app);

app.listen(port, () =>{
    console.log(`App listening on port ${port}`);
})