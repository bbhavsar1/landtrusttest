import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { injectIntl } from 'react-intl';
import AsyncSelect from 'react-select/lib/Async';
import css from './SelectSpeciesFilter.css';
import { bigGameTypes, fishTypes, smallGameTypes, uplandGameTypes, waterfowlTypes } from '../../marketplace-custom-config';

const huntOptionGroups = [
  { group: 'Big Game', paramName: 'pub_bigGameTypes', options: bigGameTypes },
  { group: 'Small Game', paramName: 'pub_smallGameTypes', options: smallGameTypes },
  { group: 'Upland', paramName: 'pub_uplandGameTypes', options: uplandGameTypes },
  { group: 'Waterfowl', paramName: 'pub_waterfowlTypes', options: waterfowlTypes },
];

const huntOptions = bigGameTypes.concat(smallGameTypes, uplandGameTypes, waterfowlTypes);

const findInitialValue = (categoryValue, speciesValue) => {
  if (categoryValue === 'hunt') {
    return huntOptions.find(a => a.key === speciesValue);
  }
  else if (categoryValue === 'fish') {
    return fishTypes.find(a => a.key === speciesValue);
  }
  return null;
};


class SelectSpeciesFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: (props.initialValue ? findInitialValue(this.props.categoryValue, props.initialValue) : null)
    }
    this.speciesOptions = this.speciesOptions.bind(this);
    this.filterSpecies = this.filterSpecies.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.filterStyles = this.filterStyles.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
  }

  handleFilterSelect(selection) {
    if (selection) {
      this.props.onSelect(selection.paramName, selection.value);
      this.setState({ initialValue: selection });
      return;
    }
    this.props.onSelect(null);
    this.setState({ initialValue: null });
  }

  filterStyles() {
    const defaultStyle = {
      width: '200px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '12px',
      color: '#000000',
    };
    return {
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
  }

  speciesOptions() {
    const { categoryValue } = this.props;
    const res = [];
    switch (categoryValue) {
      case 'fish':
        fishTypes.forEach(a =>
          res.push({ value: a.key, label: a.label, category: categoryValue, paramName: 'pub_fishTypes' })
        );
        break;
      case 'hunt':
        huntOptionGroups.forEach(t => {
          const opts = [];
          t.options.forEach(a => {
            opts.push({
              value: a.key, label: a.label,
              category: categoryValue, paramName: t.paramName,
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

  filterSpecies(inputValue) {
    if (inputValue) {
      return this.speciesOptions().filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return this.speciesOptions();
  };

  loadOptions(inputValue, callback) {
    setTimeout(() => {
      callback(this.filterSpecies(inputValue));
    }, 1000);
  };

  render() {
    return (
      <div className={css.root}>
        <AsyncSelect
          value={this.state.initialValue}
          styles={this.filterStyles()}
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          isClearable={true}
          onChange={this.handleFilterSelect}
        />
      </div>
    );
  }
}

SelectSpeciesFilter.propTypes = {
  categoryValue: string.isRequired,
  onSelect: func.isRequired,
};

export default injectIntl(SelectSpeciesFilter);
