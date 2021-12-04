const mongoose = require("mongoose");

const sellerSchema =  mongoose.Schema({
    sellerid:String,
    name:String,
    productid:Array,
});

const sellermodel=mongoose.model("seller",sellerSchema,"seller");
module.exports=sellermodel;