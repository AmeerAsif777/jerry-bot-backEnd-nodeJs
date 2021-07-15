import mongoose from "mongoose";

const BasicQuestions = mongoose.Schema({
  keywords: [{ type: String, required: true }],
  question: { type: String, required: true },
});

export default mongoose.model("BasicQuestions", BasicQuestions);
