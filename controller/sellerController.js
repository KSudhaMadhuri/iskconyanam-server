const Seller = require("../model/Seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//creating Seller
const sellerSignUp = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const exist = await Seller.findOne({email});
    if (exist) {
      return res.status(400).json({ message: "Email already exist" });
    } else if (!exist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const registerSeller = new Seller({
        fullName,
        email,
        password: hashedPassword,
        role,
      });
      await registerSeller.save();
      res.status(200).json({ message: "Registered successfully",registerSeller });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports={sellerSignUp};
