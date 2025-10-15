import { BuildingOptionsData } from '../model/types';
import buildingOptionsData from '../mock/buildingOptions.json';

export class BuildingOptionsFileRepository {
  /**
   * Get all building options data
   * @returns Promise<BuildingOptionsData>
   */
  async getBuildingOptions(): Promise<BuildingOptionsData> {
    // Simulate async operation (in case you want to add delay or error handling later)
    return Promise.resolve(buildingOptionsData as BuildingOptionsData);
  }

  /**
   * Get building options synchronously
   * @returns BuildingOptionsData
   */
  getBuildingOptionsSync(): BuildingOptionsData {
    return buildingOptionsData as BuildingOptionsData;
  }
}