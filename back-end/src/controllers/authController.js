const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Register Admin
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password, role: "ADMIN" });

  if (user) {
    const token = generateToken(user._id, user.role);
    user.tokens.push(token);
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)) && user.role === "ADMIN") {
    const token = generateToken(user._id, user.role);
    user.tokens.push(token);
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Logout Admin
const logoutAdmin = async (req, res) => {
  const { token } = req.body;
  const user = await User.findById(req.user._id);

  user.tokens = user.tokens.filter((t) => t !== token);
  await user.save();

  res.json({ message: "Logged out successfully" });
};

// Refresh Token
const refreshToken = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ tokens: token });

  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const newToken = generateToken(user._id, user.role);
  user.tokens.push(newToken);
  await user.save();

  res.json({ token: newToken });
};

module.exports = { registerAdmin, loginAdmin, logoutAdmin, refreshToken };
