/**
 * data/index.js
 * Unified data exports for building information
 * Eliminates repeated imports and merges across the codebase
 */

// Core building data (Go interface)
export { buildings as freshmanBuildings } from './buildings';
export { buildings as advancedBuildings } from './advanced_building';

// Building info for Know interface
export { knowLocations as knowLocationsCN } from './buildingInfo_chinese';
export { knowLocations as knowLocationsEN } from './buildingInfo_english';

// Sorting orders
export { sortOrders } from './know_sorting';

// Convenience: merged building list for lookup
import { buildings as freshman } from './buildings';
import { buildings as advanced } from './advanced_building';

export const ALL_BUILDINGS = [...freshman, ...advanced];
