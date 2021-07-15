import mongoose from "mongoose";

const Answer = mongoose.Schema({
  questionId: { type: String, required: true },
  answer: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("Answer", Answer);
