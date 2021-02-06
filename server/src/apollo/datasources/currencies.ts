import { currencies } from '../../mock_data/mock';
import { DataSource } from 'apollo-datasource';

class CurrencyAPI extends DataSource {
  constructor() {
    super();
  }

  initialize() {
    //
  }

  getCurrencies() {
    return currencies;
  }
}

export default CurrencyAPI;
