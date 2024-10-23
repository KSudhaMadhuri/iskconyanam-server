const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  orderedBooks: {
    type: Array,
    required: true,
    default: [],
  },
  paymentScreenShot:{
    type: String,
    required: true,
    
  },
  orderedDate: {
    type: String,
    required: true,
  },
  orderMode:{
    type: String,
    required:true,
    
  }

});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
