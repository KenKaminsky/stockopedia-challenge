import { Schema, Document, model, Model } from 'mongoose';

interface ICurrency {
  name: string;
  rate: number;
}

interface ICurrencyDocument extends ICurrency, Document {}
type ICurrencyModel = Model<ICurrencyDocument>;

const CurrencySchema = new Schema<ICurrencyDocument, ICurrencyModel>({
  name: { type: String },
  rate: { type: Number },
});

const Currency = model('Currency', CurrencySchema);

export default Currency;
