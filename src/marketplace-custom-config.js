/*
 * Marketplace specific configuration.
 */

export const publicLands = [
  {
    key: 'blm',
    label: 'Bureau of Land Management (BLM)',
  },
  {
    key: 'nat_forest',
    label: 'National Forest',
  },
  {
    key: 'school_trusts',
    label: 'School Trusts',
  },
]

export const amenities = [
  {
    key: 'cabins',
    label: 'Cabins',
  },
  {
    key: 'guide_service',
    label: 'Guide Service',
  },
  {
    key: 'equipment_rental',
    label: 'Equipment Rental',
  },
];

export const categories = [
  { key: 'big_game', label: 'Big Game' },
  { key: 'fishing', label: 'Fishing' },
  { key: 'upland', label: 'Upland' },
  { key: 'waterfowl', label: 'Waterfowl' },
  { key: 'other', label: 'Other' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};
