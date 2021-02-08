import { DataSource } from 'apollo-datasource';
import Currency from '../../models/currency';

class CurrencyAPI extends DataSource {
  constructor() {
    super();
  }

  initialize() {
    //
  }

  getCurrencies() {
    return Currency.find();
  }
}

export default CurrencyAPI;
