/*
 * Marketplace specific configuration.
 */

export const fishTypes = [
  {key: 'salmon', label: 'Salmon'},
  {key: 'black_crappie', label: 'Black crappie'},
  {key: 'blue_gill', label: 'Bluegill'},
  {key: 'catfish', label: 'Catfish'},
  {key: 'trout', label: 'Trout'},
  {key: 'carp', label: 'Carp'},
  {key: 'largemouth_bass', label: 'Largemouth bass'},
  {key: 'mountain_whitefish', label: 'Mountain Whitefish'},
  {key: 'muskey', label: 'Muskey'},
  {key: 'norther_pike', label: 'Northern Pike'},
  {key: 'suckers', label: 'Suckers'},
  {key: 'smallmouth_bass', label: 'Smallmouth Bass'},
  {key: 'steelhead', label: 'Steelhead'},
  {key: 'striped_bass', label: 'Striped Bass'},
  {key: 'walleye', label: 'Walleye'},
  {key: 'white_bass', label: 'White Bass'},
  {key: 'yellow_perch', label: 'Yellow Perch'},
]

export const smallGameTypes = [
  {key: 'wild_pigs', label: 'Wild Pigs'},
  {key: 'javelina', label: 'Javelina'},
  {key: 'prairie_dogs', label: 'Prairie Dogs'},
  {key: 'cotton_tail_rabbits', label: 'Cottontail Rabbits'},
  {key: 'jackrabbits', label: 'Jackrabbits'},
  {key: 'racoons', label: 'Racoons'},
  {key: 'squirrels', label: 'Squirrels'},
  {key: 'coyotes', label: 'Coyotes'},
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
  { key: 'hunt', label: 'Hunt' },
  { key: 'fish', label: 'Fish' },
  { key: 'access', label: 'Access' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};
