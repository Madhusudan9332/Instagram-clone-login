import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

import notificationRoutes from "./routes/notification.routes.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLODINARY_CLOUD_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET,
});
const app = express();

// app.get('/', (req, res) => {
//     res.send('CORS enabled for all origins!');
// });
// console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 10000;
const _dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://twitter-clone-login.onrender.com"
      : "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notification", notificationRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname, "/Frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
