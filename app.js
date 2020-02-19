const express = require("express");
let app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    // res.render("RGBcolor.ejs");
    res.render("home");
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("RGB server listening");
});