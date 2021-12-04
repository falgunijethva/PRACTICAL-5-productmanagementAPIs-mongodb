const express = require("express");
const Mongoose = require("mongoose");
const router = express.Router();
router.use(express.json());

// create product
const productModel=require("./models/productdata");
const companyModel=require("./models/companydata");
const sellerModel=require("./models/sellerdata");


router.get("/",(req,res) => {

    res.json({data:["Product Details"]});

});

//add product
router.post("/addproduct",(req,res)=>{
    const newproduct= req.body;
   productModel.create(newproduct);
   return res.json({ data :"product insert successfully", msg:newproduct});
});

//delete product 
router.delete("/deleteproduct/:pid",async(req,res)=> {
    const pid = req.params.pid;
    const deleteproduct =await productModel.findOneAndDelete({productid : pid});
    return res.json({msg : " product succesffuly deleted! ...",data:deleteproduct})
    
 });

//update record 
router.put("/updateproduct/:id",async(req,res)=>{
    const productid=req.params.id;
    const category=req.body.category;
    const updateProduct= await productModel.findOneAndUpdate(
        {productid:productid},
        {category:category},
        {new:true}
        );
    res.json({msg:"Product Updated Successfully !.......",newData:updateProduct})

});

//fetch all product of company
router.get("/retrieve/pdroductcompany/:cid",async(req,res)=>{
    const companyid=req.params.cid;
    const companydata=await companyModel.find({companyid:companyid},{productid:true});

    if(companydata.length === 0){
        res.json({data:"company not Found"});
    }
    const productid=companydata[0].productid;
    const productdata =await productModel.find({productid:productid})
    res.json({data:productdata});
});

//fetch all product of seller 
router.get("/retrieve/pdroductseller/:sid",async(req,res)=>{
    const sellerid=req.params.sid;
    const sellerdata=await sellerModel.find({sellerid:sellerid},{productid:true});

    if(sellerdata.length === 0){
        res.json({data:"Seller not Found"});
    }
    const productid=sellerdata[0].productid;
    const productdata =await productModel.find({productid:productid})
    res.json({data:productdata});
});

module.exports=router;
