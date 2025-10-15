import { BuildingOptionsFileRepository } from './file.repository';
import { BuildingOptionsData, BuildingOption } from '../model/types';

// Create a singleton instance of the repository
const buildingOptionsRepository = new BuildingOptionsFileRepository();

/**
 * Get all building options data
 * @returns Promise<BuildingOptionsData>
 */
export const getBuildingOptions = async (): Promise<BuildingOptionsData> => {
  return buildingOptionsRepository.getBuildingOptions();
};

/**
 * Get building options synchronously
 * @returns BuildingOptionsData
 */
export const getBuildingOptionsSync = (): BuildingOptionsData => {
  return buildingOptionsRepository.getBuildingOptionsSync();
};

// Export types for convenience
export type { BuildingOptionsData, BuildingOption };

// Export repository class for advanced usage
export { BuildingOptionsFileRepository };