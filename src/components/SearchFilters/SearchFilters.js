import React from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import { SelectCategoryFilter, SelectSpeciesFilter, PriceFilter } from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { propTypes } from '../../util/types';
import css from './SearchFilters.css';

// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;
const RADIX = 10;

// resolve initial value for a single value filter
const initialValue = (queryParams, paramName) => {
  return queryParams[paramName];
};

// resolve initial values for a multi value filter
const initialValues = (queryParams, paramName) => {
  return !!queryParams[paramName] ? queryParams[paramName].split(',') : [];
};

const initialPriceRangeValue = (queryParams, paramName) => {
  const price = queryParams[paramName];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

  return !!price && valuesFromParams.length === 2
    ? {
      minPrice: valuesFromParams[0],
      maxPrice: valuesFromParams[1],
    }
    : null;
};

const SearchFiltersComponent = props => {
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    categoryFilter,
    bigGameTypesFilter,
    priceFilter,
    isSearchFiltersPanelOpen,
    toggleSearchFiltersPanel,
    searchFiltersPanelSelectedCount,
    history,
    intl,
  } = props;



  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, { [css.longInfo]: hasNoResult }, className);

  const bigGameTypesLabel = intl.formatMessage({
    id: 'SearchFilters.bigGameTypesLabel',
  });

  const initialBigGameTypes = bigGameTypesFilter
    ? initialValues(urlQueryParams, bigGameTypesFilter.paramName) : null;

  const initialCategory = categoryFilter
    ? initialValue(urlQueryParams, categoryFilter.paramName)
    : null;

  const initialPriceRange = priceFilter
    ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
    : null;

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };


  const handleSelectOption = (urlParam, option) => {
    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [urlParam]: option }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const removeSpeciesSelectOption = () => {
    const cleanUrlQueryParams = { ...urlQueryParams }
    delete cleanUrlQueryParams.pub_fishTypes;
    delete cleanUrlQueryParams.pub_bigGameTypes;
    delete cleanUrlQueryParams.pub_smallGameTypes;
    delete cleanUrlQueryParams.pub_uplandGameTypes;
    delete cleanUrlQueryParams.pub_waterfowlGameTypes;
    return cleanUrlQueryParams;
  }

  const handleCategorySelectOption = (urlParam, option) => {
    const cleanUrlQueryParams = removeSpeciesSelectOption();
    delete cleanUrlQueryParams.pub_category;
    handleCategoryBasedSelectOption(urlParam, option, cleanUrlQueryParams);
  };

  const handleSpeciesSelectOption = (urlParam, option) => {
    const cleanUrlQueryParams = removeSpeciesSelectOption();
    if (urlParam) {
      handleCategoryBasedSelectOption(urlParam, option, cleanUrlQueryParams);
      return;
    }
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, cleanUrlQueryParams));
  };

  const handleCategoryBasedSelectOption = (urlParam, option, cleanUrlQueryParams) => {
    const queryParams = option
      ? { ...cleanUrlQueryParams, [urlParam]: option }
      : omit(cleanUrlQueryParams, urlParam);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handlePrice = (urlParam, range) => {
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const categoryFilterElement = categoryFilter ? (
    <SelectCategoryFilter
      urlParam={categoryFilter.paramName}
      onSelect={handleCategorySelectOption}
      options={categoryFilter.options}
      initialValue={initialCategory}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const isSpeciesFilterEnabled = initialCategory &&
    (initialCategory === 'hunt' || initialCategory === 'fish') ? true : false;

  const speciesFilterElement = isSpeciesFilterEnabled ? (
    <SelectSpeciesFilter
      key={initialCategory}
      onSelect={handleSpeciesSelectOption}
      categoryValue={initialCategory}
    />
  ) : null;

  const priceFilterElement = priceFilter ? (
    <PriceFilter
      id="SearchFilters.priceFilter"
      urlParam={priceFilter.paramName}
      onSubmit={handlePrice}
      showAsPopup
      {...priceFilter.config}
      initialValues={initialPriceRange}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const toggleSearchFiltersPanelButtonClasses =
    isSearchFiltersPanelOpen || searchFiltersPanelSelectedCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSearchFiltersPanelButton = toggleSearchFiltersPanel ? (
    <button
      className={toggleSearchFiltersPanelButtonClasses}
      onClick={() => {
        toggleSearchFiltersPanel(!isSearchFiltersPanelOpen);
      }}
    >
      <FormattedMessage
        id="SearchFilters.moreFiltersButton"
        values={{ count: searchFiltersPanelSelectedCount }}
      />
    </button>
  ) : null;
  return (
    <div className={classes}>
      <div className={css.filters}>
        {categoryFilterElement}
        {speciesFilterElement}
        {priceFilterElement}
      </div>

      {listingsAreLoaded && resultsCount > 0 ? (
        <div className={css.searchResultSummary}>
          <span className={css.resultsFound}>
            <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
          </span>
        </div>
      ) : null}

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFilters.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFilters.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  categoryFilter: null,
  bigGameTypesFilter: null,
  isSearchFiltersPanelOpen: false,
  toggleSearchFiltersPanel: null,
  searchFiltersPanelSelectedCount: 0,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  categoriesFilter: propTypes.filterConfig,
  bigGameTypesFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
  isSearchFiltersPanelOpen: bool,
  toggleSearchFiltersPanel: func,
  searchFiltersPanelSelectedCount: number,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(withRouter, injectIntl)(SearchFiltersComponent);

export default SearchFilters;
