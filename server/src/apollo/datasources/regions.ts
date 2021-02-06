import { regions } from '../../mock_data/mock';
import { DataSource } from 'apollo-datasource';

class RegionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize() {
    //
  }

  getRegions() {
    return regions;
  }
}

export default RegionAPI;
