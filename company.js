const express= require('express');
const Mongoose = require('mongoose');
const router = express.Router();
router.use(express.json());


const productModel=require("./models/productdata");
const companyModel=require("./models/companydata");
const sellerModel=require("./models/sellerdata");
//const { create } = require('./models/productdata');

router.get("/",(req,res) => {

    res.json({data:["company Details"]});

});

// add company
router.post("/addcompany",(req,res) =>{
    const newcompany=req.body;
    companyModel.create(newcompany);
    return res.json({msg : "Inserted company successfully ",data:newcompany});
});

//delete company
router.delete("/deletecomapany/:cid", async(req,res) => {
    const cid = req.params.cid;
    const deletecompany=await companyModel.findOneAndDelete({companyid:cid});
    res.json({data : "company successfully deleted ",data:deletecompany})
}); 

//update record 
router.put("/updatecompany/:id",async(req,res)=>{
    const companyid=req.params.id;
    const productid=req.body.productid;
    const updateCompany=await companyModel.findOneAndUpdate(
        {companyid:companyid},
        {productid:productid},
        {new:true}
    );
    res.json({msg:"Company Updated Successfully!....",newData:updateCompany});
});

//fetch data 
router.get("/retrieve/:pname",async(req,res)=>{
    const pname=req.params.pname;
    const productdata =await productModel.find({title : pname},{companyid:true});
    //console.log(productdata);
    if(productdata.length == 0){
        return res.json({data : "no product found "});
    }
    const companyid=productdata[0]["companyid"];
    //console.log(companyid);
    const companydata =await companyModel.find({companyid : companyid},{});
    return res.json({data:companydata });

});

module.exports=router;