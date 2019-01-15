import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { injectIntl } from 'react-intl';
import Select from 'react-select';
import css from './SelectMethodOfTakeFilter.css';
import {
  huntMotMap, fishMotMap,
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

class SelectMethodOfTakeFilter extends Component {
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
      return huntMotMap.find(a => a.key === initialValue);
    }
    else if (activity === 'fish') {
      return fishMotMap.find(a => a.key === initialValue);
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
        fishMotMap.forEach(a =>
          res.push({ value: a.key, label: a.label, category: activity, paramName: 'pub_fishMotTypes' })
        );
        break;
      case 'hunt':
        huntMotMap.forEach(a =>
          res.push({ value: a.key, label: a.label, category: activity, paramName: 'pub_huntMotTypes' })
        );
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
          placeholder='Method Of Take'
        />
      </div>
    );
  }
}

SelectMethodOfTakeFilter.propTypes = {
  key: string.isRequired,
  activity: string.isRequired,
  initialValue: string,
  onSelect: func.isRequired,
};

export default injectIntl(SelectMethodOfTakeFilter);
