import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { injectIntl } from 'react-intl';
import Select from 'react-select';
import css from './SelectSpeciesFilter.css';
import {
  bigGameTypeMap, fishTypeMap, smallGameTypeMap, uplandGameTypeMap, waterfowlTypeMap,
  ltBorderColor, ltFocusBorderColor, ltForegroundColor, ltBackgroundColor, ltActiveBackgroundColor,
  ltActiveForegroundColor, ltHoverForegroundColor
} from '../../marketplace-custom-config';

const defaultStyle = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: '12px',
  color: '#000000',
};

const cssStyles = {
  control: (styles, state) => ({
    ...styles,
    ...defaultStyle,
    width: '200px',
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
    ...defaultStyle,
    padding: '0px 0px 0px 6px',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ...defaultStyle,
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
    ...defaultStyle,
    padding: '0px',
    color: state.hasValue ? ltActiveForegroundColor : ltForegroundColor
  }),
  placeholder: styles => ({
    ...styles,
    ...defaultStyle,
    fontWeight: 600,
  }),
  groupHeading: (styles, { data }) => ({
    ...styles,
    ...defaultStyle,
    fontWeight: 600,
    padding: '0px 0px 0px 8px',
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...defaultStyle,
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
    ...defaultStyle
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    ...defaultStyle
  }),
};

const huntOptionGroups = [
  { group: 'Big Game', paramName: 'pub_bigGameTypes', options: bigGameTypeMap },
  { group: 'Small Game', paramName: 'pub_smallGameTypes', options: smallGameTypeMap },
  { group: 'Upland', paramName: 'pub_uplandGameTypes', options: uplandGameTypeMap },
  { group: 'Waterfowl', paramName: 'pub_waterfowlTypes', options: waterfowlTypeMap },
];

const huntOptions = bigGameTypeMap.concat(smallGameTypeMap, uplandGameTypeMap, waterfowlTypeMap);

class SelectSpeciesFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: (props.initialValue ? this.findInitialValue() : null)
    }
    this.findInitialValue = this.findInitialValue.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  findInitialValue() {
    const { activity, initialValue } = this.props;
    if (!initialValue) {
      return null;
    }
    if (activity === 'hunt') {
      return huntOptions.find(a => a.key === initialValue);
    }
    else if (activity === 'fish') {
      return fishTypeMap.find(a => a.key === initialValue);
    }
    return null;
  };

  onSelect(selection) {
    if (selection) {
      this.props.onSelect(selection.paramName, selection.value);
      this.setState({ initialValue: selection });
      return;
    }
    this.props.onSelect(null);
    this.setState({ initialValue: null });
  }

  generateOptions() {
    const { activity } = this.props;
    const res = [];
    switch (activity) {
      case 'fish':
        fishTypeMap.forEach(a =>
          res.push({ value: a.key, label: a.label, category: activity, paramName: 'pub_fishTypes' })
        );
        break;
      case 'hunt':
        huntOptionGroups.forEach(t => {
          const opts = [];
          t.options.forEach(a => {
            opts.push({
              value: a.key, label: a.label,
              category: activity, paramName: t.paramName,
            });
          })
          res.push({ label: t.group, options: opts })
        });
        break;
      default:
        break;
    }
    return res;
  };

  render() {
    return (
      <div className={css.root}>
        <Select
          value={this.state.initialValue}
          styles={cssStyles}
          options={this.generateOptions()}
          isClearable={true}
          onChange={this.onSelect}
          placeholder='Species'
        />
      </div>
    );
  }
}

SelectSpeciesFilter.propTypes = {
  key: string.isRequired,
  activity: string.isRequired,
  initialValue: string,
  onSelect: func.isRequired,
};

export default injectIntl(SelectSpeciesFilter);
