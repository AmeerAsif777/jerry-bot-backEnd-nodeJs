import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: {
    type: [
      {
        id: String,
        likes: { type: [String], default: [] },
        userDetails: { _id: String, name: String, email: String },
        message: String,
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    default: [],
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
