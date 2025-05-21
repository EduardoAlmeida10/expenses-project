import Expense from '../models/Expense.js';
import User from '../models/User.js';

export const createExpense = async (req, res) => {
  try {
    const { title, description, amount, participants } = req.body;

    if (!participants || participants.length === 0) {
      return res.status(400).json({ error: 'At least one participant must be provided.' });
    }

    const expense = new Expense({
      title,
      description,
      amount,
      participants: participants.map(p => ({
        user: p.userId,
        paid: p.paid || false,
      })),
    });

    await expense.save();

    await Promise.all(
      participants.map(async (p) => {
        await User.findByIdAndUpdate(
          p.userId,
          { $inc: { amountTotal: amount } }
        );
      })
    );
    
    res.status(201).json(await expense.populate('participants.user', 'name'));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('participants.user', 'name');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, amount, participants } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      id,
      {
        title,
        description,
        amount,
        participants: participants.map(p => ({
          user: p.userId,
          paid: p.paid || false,
        })),
      },
      { new: true }
    ).populate('participants.user', 'name');

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
