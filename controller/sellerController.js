const Seller = require("../model/Seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

//creating Seller
const sellerSignUp = async (req, res) => {
  try {
    const { fullName, email, password, role, admin } = req.body;
    const exist = await Seller.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exist" });
    } else if (!exist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const registerSeller = new Seller({
        fullName,
        email,
        password: hashedPassword,
        role,
        admin,
      });
      await registerSeller.save();
      res
        .status(200)
        .json({ message: "Registered successfully", registerSeller });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
//sellerLoginController logic
const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await Seller.findOne({ email });
    if (!exist) {
      res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, exist.password);
    // console.log(isMatch);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        sellerId: exist._id,
      },
      secretKey
    );
    res.status(200).json({ message: "seller loggedin successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//getting sellerDetails
const getSellerDetails = async (req, res) => {
  try {
    const getSeller = await Seller.findById(req.sellerId);
    if (!getSeller) {
      res.status(404).json({ message: "seller not found" });
    }
    res
      .status(200)
      .json({ message: " Seller details fetched Successfully", getSeller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//get allsellers cotroller logic

const getAllSellers = async (req, res) => {
  try {
    const getSellers = await Seller.find();
    if (!getSellers) {
      res.status(404).json({ message: "No sellers found" });
    }
    res
      .status(200)
      .json({ message: "All sellers fetched successfully", getSellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//updating sellerRole Controller logic
const updateSellerRole = async (req, res) => {
  try {
    const updateAll  = req.body;
    const updatedRole = await Seller.findByIdAndUpdate(
      req.params.id,
      updateAll,
      { new: true }
    );
    res
      .status(200)
      .json({ message: " Seller Role updated Successfully", updatedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//delete sellerController logic

const deleteSeller = async (req, res) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Deleted Seller Successfully", deletedSeller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  sellerSignUp,
  loginSeller,
  getSellerDetails,
  updateSellerRole,
  deleteSeller,
  getAllSellers,
};
