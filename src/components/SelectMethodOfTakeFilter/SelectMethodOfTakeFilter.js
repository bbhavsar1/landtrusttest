import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { injectIntl } from 'react-intl';
import Select from 'react-select';
import css from './SelectMethodOfTakeFilter.css';
import { huntMotMap, fishMotMap, searchFilterCssStyles } from '../../marketplace-custom-config';

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
          styles={searchFilterCssStyles}
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
  activity: string.isRequired,
  initialValue: string,
  onSelect: func.isRequired,
};

export default injectIntl(SelectMethodOfTakeFilter);
