const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bookRoute = require("./route/bookRoute");
const orderRoute = require("./route/orderRoute");
const mailRoute = require("./route/mailRoute");
const sellerRoute=require("./route/sellerRoute");
const PORT = process.env.PORT || 8001;

//app.use(cors({ origin: "*" }));
// Allowed origins
const allowedOrigins = [
  "https://iskconyanamstores.netlify.app",
  "https://iskconyanamstoresseller.netlify.app",
];

// CORS middleware
app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGO DB IS CONNECTED");
  })
  .catch((err) => {
    console.log("MONGO DB NOT CONNECTED: " + err);
    process.exit(1); // Stop the server if MongoDB fails to connect
  });

app.use("/book", bookRoute);
app.use("/order", orderRoute);
app.use("/mail",mailRoute);
app.use("/seller",sellerRoute)

app.listen(PORT, () => {
  console.log("Server is running at port:" + PORT);
});
