import express from "express";

import {
  getQuestions,
  createQuestions,
} from "../controllers/basicQuestions.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.post("/", getQuestions);
router.get("/:id", auth, getQuestions);
router.post("/", auth, createQuestions);
// router.delete('/:id', auth, deletePost);

export default router;
