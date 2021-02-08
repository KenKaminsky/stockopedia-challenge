import { Schema, Document, model, Model } from 'mongoose';

interface IPlan {
  code: string;
  name: string;
  monthlyCost: number;
  annualCost: number;
}

interface IPlanDocument extends IPlan, Document {}
type IPlanModel = Model<IPlanDocument>;

const PlanSchema = new Schema<IPlanDocument, IPlanModel>({
  code: { type: String },
  name: { type: String },
  monthlyCost: { type: Number },
  annualCost: { type: Number },
});

const Plan = model('Plan', PlanSchema);

export default Plan;
