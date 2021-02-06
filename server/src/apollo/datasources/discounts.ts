import { discounts } from '../../mock_data/mock';
import { DataSource } from 'apollo-datasource';

class DiscountAPI extends DataSource {
  constructor() {
    super();
  }

  initialize() {
    //
  }

  getDiscounts() {
    return discounts;
  }
}

export default DiscountAPI;
