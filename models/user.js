import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  secretCode: { type: String, required: true },
  hashedSecretCode: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
