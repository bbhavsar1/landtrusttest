import React from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import { SelectCategoryFilter, SelectSpeciesFilter, SelectMethodOfTakeFilter, PriceFilter } from '../../components';
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

// get the value from the queryParams if it is a valid value from one of the related filters
const getInitialRelatedFiltersValue = (queryParams, filtersGroup) => {
  let filter = filtersGroup.find(a => queryParams[a.paramName]);
  if (filter) {
    return queryParams[filter.paramName];
  }
  return null;
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
    priceFilter,
    huntMotTypesFilter,
    fishMotTypesFilter,
    history
  } = props;



  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, { [css.longInfo]: hasNoResult }, className);

  const initialSpecies = getInitialRelatedFiltersValue(
    urlQueryParams, [props.bigGameTypesFilter, props.smallGameTypesFilter, props.uplandGameTypesFilter,
    props.waterfowlTypesFilter, props.fishTypesFilter]);

  const initialMethodOfTake = getInitialRelatedFiltersValue(
    urlQueryParams, [huntMotTypesFilter, fishMotTypesFilter]);

  const activity = categoryFilter
    ? initialValue(urlQueryParams, categoryFilter.paramName)
    : null;

  const initialPriceRange = priceFilter
    ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
    : null;

  const deleteSpeciesUrlParams = (initUrlQueryParams) => {
    const cleanUrlQueryParams = { ...initUrlQueryParams }
    delete cleanUrlQueryParams.pub_fishTypes;
    delete cleanUrlQueryParams.pub_bigGameTypes;
    delete cleanUrlQueryParams.pub_smallGameTypes;
    delete cleanUrlQueryParams.pub_uplandGameTypes;
    delete cleanUrlQueryParams.pub_waterfowlGameTypes;
    return cleanUrlQueryParams;
  }

  const deleteMethodOfTakeUrlParams = (initUrlQueryParams) => {
    const cleanUrlQueryParams = { ...initUrlQueryParams }
    delete cleanUrlQueryParams.pub_fishMotTypes;
    delete cleanUrlQueryParams.pub_huntMotTypes;
    return cleanUrlQueryParams;
  }

  const handleCategorySelectOption = (urlParam, option) => {
    const cleanUrlQueryParamsNoSpecies = deleteSpeciesUrlParams(urlQueryParams);
    const cleanUrlQueryParams = deleteMethodOfTakeUrlParams(cleanUrlQueryParamsNoSpecies);
    delete cleanUrlQueryParams.pub_category;
    handleCategoryBasedSelectOption(urlParam, option, cleanUrlQueryParams);
  };

  const handleSpeciesSelectOption = (urlParam, option) => {
    const cleanUrlQueryParams = deleteSpeciesUrlParams(urlQueryParams);
    if (urlParam) {
      handleCategoryBasedSelectOption(urlParam, option, cleanUrlQueryParams);
      return;
    }
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, cleanUrlQueryParams));
  };

  const handleMethodOfTakeSelectOption = (urlParam, option) => {
    const cleanUrlQueryParams = deleteMethodOfTakeUrlParams(urlQueryParams);
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
      initialValue={activity}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const isHuntFishFilterEnabled = activity &&
    (activity === 'hunt' || activity === 'fish') ? true : false;

  const speciesFilterElement = isHuntFishFilterEnabled ? (
    <SelectSpeciesFilter
      key={'species-' + activity}
      onSelect={handleSpeciesSelectOption}
      activity={activity}
      initialValue={initialSpecies}
    />
  ) : null;

  const motFilterElement = isHuntFishFilterEnabled ? (
    <SelectMethodOfTakeFilter
      key={'mot-' + activity}
      onSelect={handleMehodOfTakeSelectOption}
      activity={activity}
      initialValue={initialMethodOfTake}
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

  return (
    <div className={classes}>
      <div className={css.filters}>
        {categoryFilterElement}
        {speciesFilterElement}
        {motFilterElement}
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
  priceFilter: propTypes.filterConfig,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(withRouter, injectIntl)(SearchFiltersComponent);

export default SearchFilters;
