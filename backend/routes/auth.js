import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouter = express.Router();

// All are after /api/auth

// Register
authRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generating Salt for the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("Email not found.");
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json("Wrong Password");
    } else {
      const token = jwt.sign(
        { _id: user._id, username: user.username, email: user.email },
        process.env.SECRET,
        {
          expiresIn: "30d",
        }
      );
      const { password, ...info } = user._doc;
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 3600000 * 5,
        })
        .status(200)
        .json(info);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error Logging in");
  }
});

// Logout
authRouter.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("User logged out successfully !");
  } catch (error) {
    res.status(500).json(error);
  }
});

// REFETCH USER
authRouter.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

export default authRouter;
