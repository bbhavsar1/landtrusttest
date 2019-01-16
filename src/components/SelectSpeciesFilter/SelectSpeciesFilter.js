import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { injectIntl } from 'react-intl';
import Select from 'react-select';
import css from './SelectSpeciesFilter.css';
import {
  bigGameTypeMap, fishTypeMap, smallGameTypeMap, uplandGameTypeMap, waterfowlTypeMap, searchFilterCssStyles,
} from '../../marketplace-custom-config';

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
          styles={searchFilterCssStyles}
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
  activity: string.isRequired,
  initialValue: string,
  onSelect: func.isRequired,
};

export default injectIntl(SelectSpeciesFilter);
