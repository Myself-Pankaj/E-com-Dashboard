import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.use(cors());

import userRoute from './routes/userRoute.js';
import itemRoute from './routes/itemRoute.js';
import orderRoute from './routes/orderRoute.js';
import adminRoute from './routes/adminRoute.js';



app.use("/attar/v1", adminRoute);
app.use("/attar/v1", userRoute);
app.use("/attar/v1", itemRoute);
app.use("/attar/v1", orderRoute);

app.use(express.static(path.resolve("./dashboard/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dashboard/build/index.html"));
});
