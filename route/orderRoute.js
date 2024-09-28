const express = require("express");
const route = express.Router();
const orderController = require("../controller/orderController");

route.post("/placeorder",orderController.placeOrder);
route.get("/getorder",orderController.getOrder);
route.delete("/delorder/:id",orderController.delOrders);
module.exports = route;
