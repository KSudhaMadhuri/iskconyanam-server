const express=require("express");
const route= express.Router();
const sellerController=require("../controller/sellerController");
const verifyToken = require("../middleware")

route.post("/signupseller",sellerController.sellerSignUp);
route.post("/loginseller",sellerController.loginSeller);
route.get("/getseller",verifyToken,sellerController.getSellerDetails);
module.exports=route;