import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-montana',
    predictionPlace: {
      address: 'Montana, United States',
      origin: new LatLng(46.965260, -109.533691),
      bounds: new LatLngBounds(new LatLng(48.29783, -104.25448), new LatLng(45.1665891, -112.917532)),
    },
  },
  {
    id: 'default-washington',
    predictionPlace: {
      address: 'Washington, United States',
      origin: new LatLng(47.7511, -120.7401),
      bounds: new LatLngBounds(new LatLng(49.29783, -116.25448), new LatLng(45.1665891, -124.917532)),
    },
  },
];
