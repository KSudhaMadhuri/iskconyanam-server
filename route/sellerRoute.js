const express=require("express");
const route= express.Router();
const sellerController=require("../controller/sellerController");

route.post("/signupseller",sellerController.sellerSignUp);
module.exports=route;