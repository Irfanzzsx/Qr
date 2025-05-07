import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";

const port = 3000;
const app = express();

let databaseInput;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
let acces = false;

app.get("/", (req,res) => {
   if (acces === true ) {
    console.log(databaseInput);
    var qr_svg = qr.image(databaseInput, { type: 'svg' });
    qr_svg.pipe(fs.createWriteStream(`public/qr.svg`));
   }
    res.render("index.ejs");
})

app.post("/post", (req,res) => {
    const input = req.body["generator"];
    databaseInput = input ;
    acces = true;
    res.redirect("/",);
})

app.listen(port, () => {
    console.log("listen");
})