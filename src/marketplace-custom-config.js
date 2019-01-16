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

export const fishTypeMap = [
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

export const bigGameTypeMap = [
  { key: 'black_bear', label: 'Black Bear' },
  { key: 'mountain_lion', label: 'Mountain Lion' },
  { key: 'mule_deer', label: 'Mule Deer' },
  { key: 'white_tailed_deer', label: 'White-tailed Deer' },
  { key: 'black_tailed_deer', label: 'Black-tailed Deer' },
  { key: 'elk', label: 'Elk' },
  { key: 'moose', label: 'Moose' },
  { key: 'Wolf', label: 'Wolf' },
]

export const smallGameTypeMap = [
  { key: 'wild_pigs', label: 'Wild Pigs' },
  { key: 'javelina', label: 'Javelina' },
  { key: 'prairie_dogs', label: 'Prairie Dogs' },
  { key: 'cotton_tail_rabbits', label: 'Cottontail Rabbits' },
  { key: 'jackrabbits', label: 'Jackrabbits' },
  { key: 'racoons', label: 'Racoons' },
  { key: 'squirrels', label: 'Squirrels' },
  { key: 'coyotes', label: 'Coyotes' },
]

export const uplandGameTypeMap = [
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

export const waterfowlTypeMap = [
  { key: 'ducks', label: 'Ducks' },
  { key: 'canada_geese', label: 'Canada Geese' },
  { key: 'snow_geese', label: 'Snow Geese' },
  { key: 'ross_geese', label: 'Ross Geese' },
  { key: 'white_fronted_geese', label: 'White-fronted Geese' },
]

export const agricultureTypeMap = [
  { key: 'alfalfa', label: 'Alfalfa', },
  { key: 'wheat', label: 'Wheat', },
  { key: 'sorgum', label: 'Sorgum', },
  { key: 'corn', label: 'Corn', },
  { key: 'cotton', label: 'Cotton', },
  { key: 'soy_beans', label: 'Soy Beans', },
  { key: 'oats', label: 'Oats', },
]

export const landTypeMap = [
  { key: 'mountains', label: 'Mountains', },
  { key: 'hills', label: 'Hills', },
  { key: 'creeks', label: 'Creeks', },
  { key: 'draws', label: 'Draws', },
  { key: 'fields', label: 'Fields', },
  { key: 'forest', label: 'Forest', },
  { key: 'meadow', label: 'Meadow', },
  { key: 'island', label: 'Island', },
  { key: 'mesa', label: 'Mesa', },
  { key: 'plains', label: 'Plains', },
  { key: 'spur', label: 'Spur', },
  { key: 'valley', label: 'Valley', },
]

export const waterTypeMap = [
  { key: 'river', label: 'River', },
  { key: 'spring_creek', label: 'Spring Creek', },
  { key: 'pond', label: 'Pond', },
  { key: 'lake', label: 'Lake', },
  { key: 'reservoir', label: 'Reservoir', },
  { key: 'spring', label: 'Spring', },
  { key: 'sea', label: 'Sea', },
  { key: 'narrows', label: 'Narrows', },
]

export const publicLandMap = [
  { key: 'blm', label: 'Bureau of Land Management (BLM)', },
  { key: 'bma', label: 'Block Management Areas (BMA)', },
  { key: 'nat_forest', label: 'National Forest', },
  { key: 'nat_park', label: 'National Park', },
  { key: 'nat_wildlife_refuge', label: 'National Wildlife Refuge', },
  { key: 'nat_cons_area', label: 'National Conservation Areas', },
  { key: 'nat_monuments', label: 'National Monuments', },
  { key: 'nat_rec_area', label: 'National Recreation Areas', },
  { key: 'nat_sea_and_lake_shores', label: 'National Seashores and Lakeshores', },
  { key: 'nat_trails', label: 'National Trails', },
  { key: 'wilderness', label: 'Wilderness', },
  { key: 'wild_and_scenic_rivers', label: 'Wild And Scenic Rivers', },
  { key: 'state_lands', label: 'State Lands', },
  { key: 'school_trusts', label: 'School Trusts', },
]

export const huntMotMap = [
  { key: 'archery', label: 'Archery', },
  { key: 'shotgun', label: 'Shotgun', },
  { key: 'rifle', label: 'Rifle', },
  { key: 'rimfire', label: 'Rimfire (.22 calibre)', },
]

export const fishMotMap = [
  { key: 'fly_fishing', label: 'Fly Fishing', },
  { key: 'artificial_lure', label: 'Artificial Lure', },
  { key: 'live_bait', label: 'Live Bait', },
  { key: 'bowfishing', label: 'Bowfishing', },
]

export const genericTabsMap = {
  fishTypes: fishTypeMap,
  bigGameTypes: bigGameTypeMap,
  smallGameTypes: smallGameTypeMap,
  uplandGameTypes: uplandGameTypeMap,
  waterfowlTypes: waterfowlTypeMap,
  landTypes: landTypeMap,
  waterTypes: waterTypeMap,
  publicLands: publicLandMap,
  agricultureTypes: agricultureTypeMap,
  huntMotTypes: huntMotMap,
  fishMotTypes: fishMotMap,
}

export const speciesProperties = ['fishTypes','bigGameTypes','smallGameTypes','uplandGameTypes','waterfowlTypes'];

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

export const getCustomLabel = (customArray, key) => {
  const pair = customArray.find(c => c.key === key);
  return pair ? pair.label : key;
};

const searchFilterCssStylesDefault = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: '12px',
  color: '#000000',
};
export const searchFilterCssStyles = {
  control: (styles, state) => ({
    ...styles,
    ...searchFilterCssStylesDefault,
    width: '204px',
    margin: '4px 4px 4px 0px',
    minHeight: '30px',
    height: '30px',
    boxShadow: 'none', // removes the blue border
    borderColor: state.hasValue ? ltActiveBackgroundColor : ltBorderColor,
    '&:hover': {
      borderColor: state.hasValue ? ltActiveBackgroundColor : ltFocusBorderColor
    },
    backgroundColor: state.hasValue ? ltActiveBackgroundColor : ltBackgroundColor
  }),
  valueContainer: (styles, state) => ({
    ...styles,
    ...searchFilterCssStylesDefault,
    padding: '0px 0px 0px 6px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ...searchFilterCssStylesDefault,
      padding: '0px 0px 0px 8px',
      backgroundColor: isSelected ? ltActiveBackgroundColor : ltBackgroundColor,
      color: isSelected ? ltActiveForegroundColor : ltForegroundColor,
      '&:hover': {
        color: ltHoverForegroundColor,        
        fontWeight: 'bold'
      },
      '&:active': {
        backgroundColor: ltActiveBackgroundColor,
        color: ltActiveForegroundColor,
      },
    };
  },
  input: (styles, state) => ({
    ...styles,
    ...searchFilterCssStylesDefault,
    padding: '0px',
    color: state.hasValue ? ltActiveForegroundColor : ltForegroundColor
  }),
  placeholder: styles => ({
    ...styles,
    ...searchFilterCssStylesDefault,
    fontWeight: 600,
  }),
  groupHeading: (styles, { data }) => ({
    ...styles,
    ...searchFilterCssStylesDefault,
    fontWeight: 600,
    padding: '0px 0px 0px 8px',
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...searchFilterCssStylesDefault,
    fontWeight: 600,
    color: ltActiveForegroundColor
  }),
  clearIndicator: (styles, state) => ({
    ...styles,
    padding: '2px',
    color: ltActiveForegroundColor,
    '&:hover': {
      color: ltActiveForegroundColor
    },
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    padding: '2px',
    color: state.hasValue ? ltActiveForegroundColor : ltForegroundColor,
    '&:hover': {
      color: state.hasValue ? ltActiveForegroundColor : ltForegroundColor
    },
  }),
  indicatorSeparator: (styles, state) => ({
    ...styles,
    backgroundColor: state.hasValue ? ltActiveForegroundColor : ltBorderColor
  }),
  loadingMessage: (styles) => ({
    ...styles,
    ...searchFilterCssStylesDefault
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    ...searchFilterCssStylesDefault
  }),
};
