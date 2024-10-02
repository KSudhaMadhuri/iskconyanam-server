const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required:true
  },
  admin:{
    type:String,
    required:true
  }
});

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
