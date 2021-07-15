import express from "express";
const router = express.Router();

import { signin, signup, userFind } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/userFind", userFind);

export default router;