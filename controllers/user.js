import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { name, secretCode } = req.body;
  try {
    const oldUser = await UserModal.findOne({ name });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      secretCode,
      oldUser.hashedSecretCode
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ name: oldUser.name, id: oldUser._id }, secret, {
      expiresIn: "24h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { name, secretCode } = req.body;
  try {
    const oldUser = await UserModal.findOne({ name });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedSecretCode = await bcrypt.hash(secretCode, 12);
    const result = await UserModal.create({
      name,
      hashedSecretCode: hashedSecretCode,
      secretCode: secretCode,
    });

    const token = jwt.sign({ name: result.name, id: result._id }, secret, {
      expiresIn: "24h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userFind = async (req, res) => {
  const { name, secretCode } = req.body;

  try {
    const user = await UserModal.findOne({ name });

    if (user) return res.status(400).json({ message: "User already exists" });

    res.status(400).json({ message: "Sorry, you are not there" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
