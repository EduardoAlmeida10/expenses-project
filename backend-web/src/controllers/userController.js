import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const user = new User({ name, amountTotal: 0 });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name amountTotal');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};