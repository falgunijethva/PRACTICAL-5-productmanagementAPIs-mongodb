
const express = require('express');
const mongooes = require('mongoose');
const router = express.Router();
router.use(express.json());


const productModel=require("./models/productdata");
const companyModel=require("./models/companydata");
const sellerModel=require("./models/sellerdata");


router.get("/",(req,res) => {

    res.json({data:["seller Details"]});

});

//add seller
router.post("/addseller",(req,res) => {
    const newseller=req.body;
    const sellerdata = sellerModel.create(newseller);
    return res.json({data : "Seller data successfully inserted"});
});

//delete seller
router.delete("/deleteseller/:sid",async(req,res) => {
    const sid = req.params.sid;
    const deleteseller=await sellerModel.findOneAndDelete({sellerid:sid})
    return res.json({data : "delete seller successfully "});
});

//update seller
router.put("/updateseller/:id",async(req,res)=>{
    const sellerid=req.params.id;
    const productid=req.body.productid;
    const updateseller=await sellerModel.findOneAndUpdate(
        {sellerid:sellerid},
        {productid:productid},
        {new :true}
    );
    res.json({status:"Seller Updated Successfully",data:updateseller})

});

//fetch seller 
router.get("/retrieve/:pname",async(req,res)=>{
    const pname=req.params.pname;
    const productdata =await productModel.find({title : pname},{sellerid:true});

    if(productdata.length == 0){
        return res.json({data : "no user in fullstack"});
    }
    const  sellerid=productdata[0].sellerid;
    //console.log(sellerId);
    const sellerData =await sellerModel.find({sellerid : sellerid},{});
    return res.json({data:sellerData });

});

module.exports=router;


