import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amountTotal: {
    type: Number,
    required: true,
    default: 0,
  },
  
});

const User = mongoose.model('User', userSchema);
export default User;