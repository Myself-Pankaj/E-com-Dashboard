import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";
import { startTask } from "./controllers/orderCleanup.js";
import Razorpay from "razorpay";

config({
  path: "./config/config.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get("/", (req, res, next) => {
  res.send("<h1>Server is Live</h1>");
});

connectDatabase();
startTask();
app.listen(process.env.PORT, () => {
  console.log("Welcome Server is Online on port " + process.env.PORT);
});
