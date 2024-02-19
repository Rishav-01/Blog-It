import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import verifyToken from "../verifyToken.js";

const userRouter = express.Router();

// All are after /api/users

// UPDATE
userRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...info } = updatedUser._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
userRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("Deleted the user successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER
userRouter.get("/:id", async (req, res) => {
  try {
    // Get a single user by id
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("No user with this ID found.");
    } else {
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default userRouter;
