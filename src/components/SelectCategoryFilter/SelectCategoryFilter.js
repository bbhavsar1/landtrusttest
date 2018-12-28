import React, { Component } from 'react';
import { string, func, arrayOf, shape, number } from 'prop-types';
import css from './SelectCategoryFilter.css';

class SelectCategoryFilter extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.onToggleActive = this.onToggleActive.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  onToggleActive(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  selectOption(urlParam, option) {
    this.setState({ isOpen: false });
    this.props.onSelect(urlParam, option);
  }

  render() {
    const {
      urlParam,
      options,
      initialValue,
    } = this.props;
    return (
      <div className={css.filterContainer}>
        {options.map(option => {
          // check if this option is selected
          const selected = initialValue === option.key;
          const filterButtonClass = selected ? css.filterButtonSelected : css.filterButton;
          
          return (
            <button
              className={filterButtonClass}
              onClick={() => this.selectOption(urlParam, option.key)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
}

SelectCategoryFilter.defaultProps = {
  initialValue: null,
  contentPlacementOffset: 0,
};

SelectCategoryFilter.propTypes = {
  urlParam: string.isRequired,
  onSelect: func.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  initialValue: string,
  contentPlacementOffset: number,
};

export default SelectCategoryFilter;
