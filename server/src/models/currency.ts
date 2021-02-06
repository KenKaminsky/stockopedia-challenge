import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
  name: { type: String },
  rate: { type: Number },
});

export default mongoose.model('Currency', currencySchema);
