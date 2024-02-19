import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    photo: { type: String, required: false },
    username: { type: String, required: true },
    userId: { type: String, required: true },
    categories: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
