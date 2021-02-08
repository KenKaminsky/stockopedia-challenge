import { DataSource } from 'apollo-datasource';
import Plan from '../../models/plan';

class PlanAPI extends DataSource {
  constructor() {
    super();
  }

  initialize() {
    //
  }

  getPlans() {
    return Plan.find();
  }
}

export default PlanAPI;
