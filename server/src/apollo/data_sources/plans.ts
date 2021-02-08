import { DataSource } from 'apollo-datasource';
import Plan from '../../models/plan';

class PlanAPI extends DataSource {
  constructor() {
    super();
  }

  getPlans() {
    return Plan.find();
  }
}

export default PlanAPI;
