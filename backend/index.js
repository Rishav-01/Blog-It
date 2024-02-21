import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";

const corsOpts = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOpts));
app.use(cookieParser());

// Custom Middlewares
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/images", express.static(path.join(__dirname, "images")));

// image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/uploads", upload.single("file"), (req, res) => {
  res.status(200).json("Image uploaded successfully");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () =>
      console.log(`DB connected and server running on PORT ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json("Connected to backend");
});
