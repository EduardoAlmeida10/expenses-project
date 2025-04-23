import Expense from '../models/Expense.js';

export const createExpense = async (req, res) => {
  try {
    const { title, description, users } = req.body;

    if (!users || users.length === 0) {
      return res.status(400).json({ error: 'At least one user must be provided.' });
    }

    const usersWithNumbers = users.map((user, index) => ({
      ...user,
      userId: index + 1,
    }));

    const expense = new Expense({ title, description, users: usersWithNumbers });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('users.userId', 'name');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, users } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      id,
      { title, description, users },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Expense not found.' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Expense not found.' });

    res.json({ message: 'Expense deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
