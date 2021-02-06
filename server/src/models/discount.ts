import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  amount: { type: Number },
});

export default mongoose.model('Discount', discountSchema);
