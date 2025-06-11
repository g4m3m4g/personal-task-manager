const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.signup = async (req, res) => {
  try {
    const { username, password, nickname } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });

    const user = new User({ username, password, nickname });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user: { username, nickname } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, user: { username, nickname: user.nickname } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
