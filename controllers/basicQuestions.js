import express from "express";
import mongoose from "mongoose";

import BasicQuestionsModel from "../models/basicQuestions.js";

const router = express.Router();

export const getQuestions = async (req, res) => {
  const { id } = req.params;
  try {
    let response;
    if (id) response = await BasicQuestionsModel.findById(id);
    else response = await BasicQuestionsModel.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createQuestions = async (req, res) => {
  const { keywords, question } = req.body;

  const newQuestion = new BasicQuestionsModel({
    keywords,
    question,
  });

  try {
    await newQuestion.save(); //doubt

    res.status(201).json("Created successfullly");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
/*
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

*/
export default router;
