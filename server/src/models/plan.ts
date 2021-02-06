import mongoose from 'mongoose';
import Region from './region';

const planSchema = new mongoose.Schema({
  name: { type: String },
  account: { type: Number },
  billinPeriod: { type: Number },
  regions: { type: [Region.schema] },
  total: { type: Number },
  currency: { type: Number },
  isActive: { type: Boolean },
  isTrial: { type: Boolean, default: true },
  trialEnd: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 },
  cratedOn: { type: Date, default: () => Date.now() }, // check mongoose-timestaps
  billingDate: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 },
});

export default mongoose.model('Plan', planSchema);

// UserSchema.plugin(timestamps);

// UserSchema.index({ createdAt: 1, updatedAt: 1 });

// export const User = mongoose.model('User', UserSchema);
// export const UserTC = composeWithMongoose(User);
