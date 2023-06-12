const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required!" });

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "User already exists!" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (user && validPassword) {
    const token = generateToken(user._id);
    const userInfo = {
      id: user._id,
      email: user.email,
      name: user.name,
      password: user.password,
      picture: user.picture,
      date: user.date,
      token,
    };
    return res.status(200).json(userInfo);
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { updateUser, registerUser, loginUser };
