import React, { Component } from 'react';
import { array, bool, func, number, object, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { withViewport } from '../../util/contextHelpers';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureListing } from '../../util/data';
import { PayoutDetailsForm } from '../../forms';
import { Modal, NamedRedirect, Tabs } from '../../components';

import EditListingWizardTab, {
  DESCRIPTION,
  FISH_MOT_TYPES,
  HUNT_MOT_TYPES,
  FEATURES,
  FISH_TYPES,
  BIG_GAME_TYPES,
  SMALL_GAME_TYPES,
  UPLAND_GAME_TYPES,
  WATERFOWL_TYPES,
  PUBLIC_LANDS,
  AGRICULTURE_TYPES,
  LAND_TYPES,
  WATER_TYPES,
  POLICY,
  LOCATION,
  PRICING,
  PHOTOS,
  SUPPORTED_TABS
} from './EditListingWizardTab';
import css from './EditListingWizard.css';

// TODO: PHOTOS panel needs to be the last one since it currently contains PayoutDetailsForm modal
// All the other panels can be reordered.
export const TABS_PREFIX = [DESCRIPTION, LOCATION];
export const TABS_SUFFIX = [PUBLIC_LANDS, POLICY, PRICING, PHOTOS,];
export const DEFAULT_TABS = TABS_PREFIX.concat(TABS_SUFFIX);
export const HUNT_TABS = TABS_PREFIX.concat([
  HUNT_MOT_TYPES,
  BIG_GAME_TYPES,
  SMALL_GAME_TYPES,
  UPLAND_GAME_TYPES,
  WATERFOWL_TYPES,
  AGRICULTURE_TYPES,
  LAND_TYPES,
  WATER_TYPES,
  FEATURES,]).concat(TABS_SUFFIX);
export const FISH_TABS = TABS_PREFIX.concat([
  FISH_MOT_TYPES,
  FISH_TYPES,
  WATER_TYPES,
  FEATURES,]).concat(TABS_SUFFIX);

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

/**
 * Check if a wizard tab is completed.
 *
 * @param tab wizard's tab
 * @param listing is contains some specific data if tab is completed
 *
 * @return true if tab / step is completed.
 */
const tabCompleted = (tab, listing) => {
  const { description, geolocation, price, title, publicData } = listing.attributes;
  const images = listing.images;

  if (!publicData) {
    return false;
  }

  switch (tab) {
    case DESCRIPTION:
      return !!(description && title);
    case LOCATION:
      return !!(geolocation && publicData.location && publicData.location.address);
    case FISH_MOT_TYPES:
    case HUNT_MOT_TYPES:
    case PUBLIC_LANDS:
    case FEATURES:
    case LAND_TYPES:
    case FISH_TYPES:
    case BIG_GAME_TYPES:
    case SMALL_GAME_TYPES:
    case UPLAND_GAME_TYPES:
    case WATERFOWL_TYPES:
    case AGRICULTURE_TYPES:
    case WATER_TYPES:
      return !!(publicData.location && publicData.location.address);
    case POLICY:
      return !!(publicData.rules);
    case PRICING:
      return !!price;
    case PHOTOS:
      return images && images.length > 0;
    default:
      return false;
  }
};

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed. In edit mode all tabs are active.
 *
 * @param isNew flag if a new listing is being created or an old one being edited
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = (tabs, isNew, listing) => {
  return tabs.reduce((acc, tab) => {
    const previousTabIndex = tabs.findIndex(t => t === tab) - 1;
    const isActive =
      previousTabIndex >= 0 ? !isNew || tabCompleted(tabs[previousTabIndex], listing) : true;
    return { ...acc, [tab]: isActive };
  }, {});
};

const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`);
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

const getTabList = (category) => {
  switch (category) {
    case 'hunt':
      return HUNT_TABS;
    case 'fish':
      return FISH_TABS;
    default:
      return DEFAULT_TABS;
  }
}

// Create a new or edit listing through EditListingWizard
class EditListingWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;

    this.state = {
      draftId: null,
      showPayoutDetails: false,
      tabList: getTabList(props.listing.attributes.publicData.category),
    };
    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this);
    this.handlePublishListing = this.handlePublishListing.bind(this);
    this.handlePayoutModalClose = this.handlePayoutModalClose.bind(this);
    this.handlePayoutSubmit = this.handlePayoutSubmit.bind(this);
    this.updateTabs = this.updateTabs.bind(this);
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll;
  }

  handlePublishListing(id) {
    const { onPublishListingDraft, currentUser } = this.props;
    const stripeConnected =
      currentUser && currentUser.attributes && currentUser.attributes.stripeConnected;
    if (stripeConnected) {
      onPublishListingDraft(id);
    } else {
      this.setState({
        draftId: id,
        showPayoutDetails: true,
      });
    }
  }

  handlePayoutModalClose() {
    this.setState({ showPayoutDetails: false });
  }

  handlePayoutSubmit(values) {
    const { fname: firstName, lname: lastName, ...rest } = values;
    this.props
      .onPayoutDetailsSubmit({ firstName, lastName, ...rest })
      .then(() => {
        this.setState({ showPayoutDetails: false });
        this.props.onManageDisableScrolling('EditListingWizard.payoutModal', false);
        this.props.onPublishListingDraft(this.state.draftId);
      })
      .catch(() => {
        // do nothing
      });
  }

  updateTabs(category) {
    this.setState({ tabList: getTabList(category) });
  }

  render() {
    const {
      id,
      className,
      rootClassName,
      params,
      listing,
      viewport,
      intl,
      errors,
      fetchInProgress,
      onManageDisableScrolling,
      onPayoutDetailsFormChange,
      ...rest
    } = this.props;

    const selectedTab = params.tab;
    const isNewListingFlow = [LISTING_PAGE_PARAM_TYPE_NEW, LISTING_PAGE_PARAM_TYPE_DRAFT].includes(
      params.type
    );
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);
    const currentListing = ensureListing(listing);
    const tabsStatus = tabsActive(this.state.tabList, isNewListingFlow, currentListing);

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = this.state.tabList.indexOf(selectedTab);
      const nearestActiveTab = this.state.tabList.slice(0, currentTabIndex)
        .reverse()
        .find(t => tabsStatus[t]);

      return <NamedRedirect name="EditListingPage" params={{ ...params, tab: nearestActiveTab }} />;
    }

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true;
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id;
      scrollToTab(tabPrefix, selectedTab);
      this.hasScrolledToTab = true;
    }

    const tabLink = tab => {
      return { name: 'EditListingPage', params: { ...params, tab } };
    };

    return (
      <div className={classes}>
        <Tabs
          rootClassName={css.tabsContainer}
          navRootClassName={css.nav}
          tabRootClassName={css.tab}
        >
          {this.state.tabList.map(tab => {
            return (
              <EditListingWizardTab
                {...rest}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={intl.formatMessage({ id: 'EditListingWizard.' + tab + 'TabLabel' })}
                tabLinkProps={tabLink(tab)}
                selected={selectedTab === tab}
                disabled={isNewListingFlow && !tabsStatus[tab]}
                tab={tab}
                intl={intl}
                params={params}
                listing={listing}
                marketplaceTabs={this.state.tabList}
                errors={errors}
                handleCreateFlowTabScrolling={this.handleCreateFlowTabScrolling}
                handlePublishListing={this.handlePublishListing}
                fetchInProgress={fetchInProgress}
                onUpdateCategory={this.updateTabs}
              />
            );
          })}
        </Tabs>
        <Modal
          id="EditListingWizard.payoutModal"
          isOpen={this.state.showPayoutDetails}
          onClose={this.handlePayoutModalClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.modalHeaderWrapper}>
            <h1 className={css.modalTitle}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitleOneMoreThing" />
              <br />
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitlePayoutPreferences" />
            </h1>
            <p className={css.modalMessage}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalInfo" />
            </p>
          </div>
          <PayoutDetailsForm
            className={css.payoutDetails}
            inProgress={fetchInProgress}
            createStripeAccountError={errors ? errors.createStripeAccountError : null}
            onChange={onPayoutDetailsFormChange}
            onSubmit={this.handlePayoutSubmit}
          />
        </Modal>
      </div>
    );
  }
}

EditListingWizard.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingWizard.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  errors: shape({
    createListingDraftError: object,
    updateListingError: object,
    publishListingError: object,
    showListingsError: object,
    uploadImageError: object,
    createStripeAccountError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withViewport, injectIntl)(EditListingWizard);
