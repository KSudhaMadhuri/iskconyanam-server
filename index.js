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
// CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the request's origin is in the allowed list or is undefined (for non-browser requests)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow access
    } else {
      callback(new Error("Not allowed by CORS")); // Deny access
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
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
