/*
 * Marketplace specific configuration.
 */

export const publicLands = [
  {
    key: 'blm',
    label: 'Bureau of Land Management (BLM)',
  },
  {
    key: 'bma',
    label: 'Block Management Areas (BMA)',
  },
  {
    key: 'nat_forest',
    label: 'National Forest',
  },
  {
    key: 'nat_park',
    label: 'National Park',
  },
  {
    key: 'nat_wildlife_refuge',
    label: 'National Wildlife Refuge',
  },
  {
    key: 'nat_cons_area',
    label: 'National Conservation Areas',
  },
  {
    key: 'nat_monuments',
    label: 'National Monuments',
  },
  {
    key: 'nat_rec_area',
    label: 'National Recreation Areas',
  },
  {
    key: 'nat_sea_and_lake_shores',
    label: 'National Seashores and Lakeshores',
  },
  {
    key: 'nat_trails',
    label: 'National Trails',
  },
  {
    key: 'wilderness',
    label: 'Wilderness',
  },
  {
    key: 'wild_and_scenic_rivers',
    label: 'Wild And Scenic Rivers',
  },
  {
    key: 'state_lands',
    label: 'State Lands',
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
