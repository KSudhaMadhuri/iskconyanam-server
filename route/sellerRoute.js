const express = require("express");
const route = express.Router();
const sellerController = require("../controller/sellerController");
const verifyToken = require("../middleware");

route.post("/signupseller", sellerController.sellerSignUp);
route.post("/loginseller", sellerController.loginSeller);
route.get("/getallsellers",sellerController.getAllSellers);
route.get("/getseller", verifyToken, sellerController.getSellerDetails);
route.put("/updatesellerrole/:id", sellerController.updateSellerRole);
route.delete("/deleteseller/:id", sellerController.deleteSeller);

module.exports = route;
