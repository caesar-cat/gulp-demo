const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(expressLayouts);
app.use(express.static("./public"));

//Serve the files on port 3000
app.listen(3000, () => {
    console.log("Server on port 3000")
})