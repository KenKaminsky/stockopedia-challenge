import mongoose from 'mongoose';
import Discount from './discount';

const regionSchema = new mongoose.Schema({
  name: { type: String },
  flag: { type: String },
  description: { type: String },
  listPrice: { type: Number },
  netPrice: { type: Number },
  discounts: { type: [Discount.schema] }, // discount type to support any future addition billing period/any reason
});

export default mongoose.model('Region', regionSchema);
