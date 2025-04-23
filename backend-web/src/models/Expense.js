// models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      paid: {
        type: Boolean,
        default: false,
      },
    },
  ],
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
