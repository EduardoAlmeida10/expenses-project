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
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      name: {
        type: String,
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
