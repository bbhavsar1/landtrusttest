import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { injectIntl } from 'react-intl';
import Select from 'react-select';
import css from './SelectSpeciesFilter.css';
import { bigGameTypes, fishTypes, smallGameTypes, uplandGameTypes, waterfowlTypes } from '../../marketplace-custom-config';

const defaultStyle = {
  width: '200px',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: '12px',
  color: '#000000',
};

const cssStyles = {
  control: styles => ({
    ...styles,
    ...defaultStyle,
    margin: '4px 4px 4px 0px',
    minHeight: '30px',
    height: '30px',
    borderColor: '#eeeeee',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ...defaultStyle,
      padding: '0px 0px 0px 10px'
    };
  },
  input: styles => ({
    ...styles
  }),
  placeholder: styles => ({
    ...styles,
    ...defaultStyle,
    fontWeight: 600
  }),
  group: (styles, { data }) => ({
    ...styles,
    ...defaultStyle,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    fontWeight: 600
  }),
  clearIndicator: (styles) => ({
    ...styles,
    padding: '2px',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: '2px',
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
  { group: 'Big Game', paramName: 'pub_bigGameTypes', options: bigGameTypes },
  { group: 'Small Game', paramName: 'pub_smallGameTypes', options: smallGameTypes },
  { group: 'Upland', paramName: 'pub_uplandGameTypes', options: uplandGameTypes },
  { group: 'Waterfowl', paramName: 'pub_waterfowlTypes', options: waterfowlTypes },
];

const huntOptions = bigGameTypes.concat(smallGameTypes, uplandGameTypes, waterfowlTypes);

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
      return fishTypes.find(a => a.key === initialValue);
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
        fishTypes.forEach(a =>
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
