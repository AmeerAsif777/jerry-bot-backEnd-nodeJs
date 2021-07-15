import express from "express";
import mongoose from "mongoose";

import AnswerModel from "../models/answer.js";

const router = express.Router();

export const createQuestions = async (req, res) => {
  const { questionId, answer } = req.body;

  const answer = new AnswerModel({
    questionId,
    answer,
    userId: req.userId,
  });

  try {
    await answer.save(); //doubt

    res.status(201).json("Created successfullly");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};