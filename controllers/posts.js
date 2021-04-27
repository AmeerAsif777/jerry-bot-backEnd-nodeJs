import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";
import UserModal from "../models/user.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags, comments } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    _id: id,
    comments,
  };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const createPostComment = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  let comment = {};
  let post = await PostMessage.findById(id);
  comment.userDetails = await UserModal.findById(req.userId);
  comment.message = req.body.message;

  if (post.comments) {
    post.comments = [...post.comments, comment];
  } else {
    post.comments = [comment];
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const updatePostComment = async (req, res) => {
  const { id } = req.params; // fetching commentId
  const { postId, message, likes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send(`No Post with id: ${postId}`);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Comment with id: ${id}`);

  let post = await PostMessage.findById(postId);
  //Updating message
  if (message) {
    post.comments = post.comments.map((comment) => {
      if (String(comment._id) === id) {
        comment.message = message;
      }
      return comment;
    });
  }

  if (likes) {
    const comment = post.comments.find((p) => String(p._id) === id);
    const index = comment.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.comments = post.comments.map((comment) => {
        if (String(comment._id) === id) {
          comment.likes.push(req.userId);
        }
        return comment;
      });
    } else {
      post.comments = post.comments.map((comment) => {
        if (String(comment._id) === id) {
          comment.likes = comment.likes.filter((id) => {
            return id !== String(req.userId);
          });
        }
        return comment;
      });
    }
  }
  let updatedPost = await PostMessage.findByIdAndUpdate(postId, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const deletePostComment = async (req, res) => {
  const { postId, commentId } = req.params; // fetching commentId

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send(`No Post with id: ${postId}`);
  if (!mongoose.Types.ObjectId.isValid(commentId))
    return res.status(404).send(`No Comment with id: ${commentId}`);

  let post = await PostMessage.findById(postId);
  post.comments = post.comments.filter(
    (comment) => String(comment._id) !== commentId
  );

  let updatedPost = await PostMessage.findByIdAndUpdate(postId, post, {
    new: true,
  });
  // res.json({ message: "Comment deleted successfully." });
  res.status(200).json(updatedPost);
};
export default router;
