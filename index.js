require("dotenv").config();


const express = require('express')
const app = express()
app.use(express.json());
const port = 3000
const mongoose = require("mongoose");

// const productModel=require("./models/productdata");
// const companyModel=require("./models/companydata");
// const sellerModel=require("./models/sellerdata");

const product = require("./product");
const company = require("./company");
//const seller = require("./seller");
const seller = require("./seller");

app.use("/product",product);
app.use("/company",company);
app.use("/seller",seller);

mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("mongo db connect "));

app.get('/', (req, res) => res.send('welcome to product managemnet APi(mongpDB'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
