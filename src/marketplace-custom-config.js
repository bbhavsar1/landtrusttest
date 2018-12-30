/*
 * Marketplace specific configuration.
 */
export const ltForegroundColor = '#000000';
export const ltBackgroundColor = '#ffffff';
export const ltBorderColor = '#EEEEEE';
export const ltFocusBorderColor = '#CBCBCB';
export const ltHoverForegroundColor = '#fd3713';
export const ltActiveBackgroundColor = '#fd3713';
export const ltActiveForegroundColor = '#ffffff';

export const fishTypes = [
  { key: 'salmon', label: 'Salmon' },
  { key: 'black_crappie', label: 'Black crappie' },
  { key: 'blue_gill', label: 'Bluegill' },
  { key: 'catfish', label: 'Catfish' },
  { key: 'trout', label: 'Trout' },
  { key: 'carp', label: 'Carp' },
  { key: 'largemouth_bass', label: 'Largemouth bass' },
  { key: 'mountain_whitefish', label: 'Mountain Whitefish' },
  { key: 'muskey', label: 'Muskey' },
  { key: 'norther_pike', label: 'Northern Pike' },
  { key: 'suckers', label: 'Suckers' },
  { key: 'smallmouth_bass', label: 'Smallmouth Bass' },
  { key: 'steelhead', label: 'Steelhead' },
  { key: 'striped_bass', label: 'Striped Bass' },
  { key: 'walleye', label: 'Walleye' },
  { key: 'white_bass', label: 'White Bass' },
  { key: 'yellow_perch', label: 'Yellow Perch' },
]

export const bigGameTypes = [
  { key: 'black_bear', label: 'Black Bear' },
  { key: 'mountain_lion', label: 'Mountain Lion' },
  { key: 'mule_deer', label: 'Mule Deer' },
  { key: 'white_tailed_deer', label: 'White-tailed Deer' },
  { key: 'black_tailed_deer', label: 'Black-tailed Deer' },
  { key: 'elk', label: 'Elk' },
  { key: 'moose', label: 'Moose' },
  { key: 'Wolf', label: 'Wolf' },
]

export const smallGameTypes = [
  { key: 'wild_pigs', label: 'Wild Pigs' },
  { key: 'javelina', label: 'Javelina' },
  { key: 'prairie_dogs', label: 'Prairie Dogs' },
  { key: 'cotton_tail_rabbits', label: 'Cottontail Rabbits' },
  { key: 'jackrabbits', label: 'Jackrabbits' },
  { key: 'racoons', label: 'Racoons' },
  { key: 'squirrels', label: 'Squirrels' },
  { key: 'coyotes', label: 'Coyotes' },
]

export const uplandGameTypes = [
  { key: 'mourning_doves', label: 'Mourning Doves' },
  { key: 'eurasian_doves', label: 'Eurasian Doves' },
  { key: 'pigeons', label: 'Pigeons' },
  { key: 'blue_grouse', label: 'Blue Grouse' },
  { key: 'dusky_grouse', label: 'Dusky Grouse' },
  { key: 'short_tailed_grouse', label: 'Sharp-tailed Grouse' },
  { key: 'ruffed_grouse', label: 'Ruffed Grouse' },
  { key: 'sage_grouse', label: 'Sage Grouse' },
  { key: 'spruce_grouse', label: 'Spruce Grouse' },
  { key: 'hungarian_partriges', label: 'Hungarian Partridges' },
  { key: 'chukar', label: 'Chukar' },
  { key: 'ring_necked_pheasants', label: 'Ring-necked Pheasants' },
  { key: 'quail', label: 'Quail' },
  { key: 'turkeys', label: 'Turkeys' },
]

export const waterfowlTypes = [
  { key: 'ducks', label: 'Ducks' },
  { key: 'canada_geese', label: 'Canada Geese' },
  { key: 'snow_geese', label: 'Snow Geese' },
  { key: 'ross_geese', label: 'Ross Geese' },
  { key: 'white_fronted_geese', label: 'White-fronted Geese' },
]

export const agricultureTypes = [
  {
    key: 'alfalfa',
    label: 'Alfalfa',
  },
  {
    key: 'wheat',
    label: 'Wheat',
  },
  {
    key: 'sorgum',
    label: 'Sorgum',
  },
  {
    key: 'corn',
    label: 'Corn',
  },
  {
    key: 'cotton',
    label: 'Cotton',
  },
  {
    key: 'soy_beans',
    label: 'Soy Beans',
  },
  {
    key: 'oats',
    label: 'Oats',
  },
]

export const landTypes = [
  {
    key: 'mountains',
    label: 'Mountains',
  },
  {
    key: 'hills',
    label: 'Hills',
  },
  {
    key: 'creeks',
    label: 'Creeks',
  },
  {
    key: 'draws',
    label: 'Draws',
  },
  {
    key: 'fields',
    label: 'Fields',
  },
  {
    key: 'forest',
    label: 'Forest',
  },
  {
    key: 'meadow',
    label: 'Meadow',
  },
  {
    key: 'island',
    label: 'Island',
  },
  {
    key: 'mesa',
    label: 'Mesa',
  },
  {
    key: 'plains',
    label: 'Plains',
  },
  {
    key: 'spur',
    label: 'Spur',
  },
  {
    key: 'valley',
    label: 'Valley',
  },
]

export const waterTypes = [
  {
    key: 'river',
    label: 'River',
  },
  {
    key: 'spring_creek',
    label: 'Spring Creek',
  },
  {
    key: 'pond',
    label: 'Pond',
  },
  {
    key: 'lake',
    label: 'Lake',
  },
  {
    key: 'reservoir',
    label: 'Reservoir',
  },
  {
    key: 'spring',
    label: 'Spring',
  },
  {
    key: 'sea',
    label: 'Sea',
  },
  {
    key: 'narrows',
    label: 'Narrows',
  },
]

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
  { key: 'hunt', label: 'Hunting' },
  { key: 'fish', label: 'Fishing' },
  { key: 'access', label: 'Access' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

export const getCustomLabel = (customArray, key) => {
  const pair = customArray.find(c => c.key === key);
  return pair ? pair.label : key;
};
