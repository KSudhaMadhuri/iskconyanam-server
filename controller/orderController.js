const Order = require("../model/Order");

//creatingOrder
const placeOrder = async (req, res) => {
  try {
    const { fullName, email, phone, address, city, state, pin, orderedBooks,paymentScreenShot,orderMode } =
      req.body;
      const currentDate=new Date().toLocaleDateString("en-GB")
    const orderBooks = new Order({
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pin,
      orderedBooks,
      paymentScreenShot,
      orderedDate:currentDate,
      orderMode
    });
    await orderBooks.save();
    res.status(200).json({ message: "Ordered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//getting orderController logic
const getOrder = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  //deleting orderController logic
  const delOrders = async (req, res) => {
    try {
      const id = req.params.id;
      const delOrder = await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Order deleted successfully", delOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };

module.exports = { placeOrder , getOrder, delOrders};
