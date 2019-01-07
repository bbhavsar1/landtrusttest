import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import routeConfiguration from '../../routeConfiguration';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureListing } from '../../util/data';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditListingDescriptionPanel,
  EditListingGenericListPanel,
  EditListingLocationPanel,
  EditListingPhotosPanel,
  EditListingPoliciesPanel,
  EditListingPricingPanel,
} from '../../components';

import css from './EditListingWizard.css';

export const DESCRIPTION = 'description';
export const PUBLIC_LANDS = 'publicLands'
export const FISH_MOT_TYPES = 'fishMotTypes'
export const HUNT_MOT_TYPES = 'huntMotTypes'
export const FISH_TYPES = 'fishTypes'
export const BIG_GAME_TYPES = 'bigGameTypes'
export const SMALL_GAME_TYPES = 'smallGameTypes'
export const UPLAND_GAME_TYPES = 'uplandGameTypes'
export const WATERFOWL_TYPES = 'waterfowlTypes'
export const AGRICULTURE_TYPES = 'agricultureTypes'
export const LAND_TYPES = 'landTypes'
export const WATER_TYPES = 'waterTypes'
export const POLICY = 'policy';
export const LOCATION = 'location';
export const PRICING = 'pricing';
export const PHOTOS = 'photos';

// EditListingWizardTab component supports these tabs
// TODO: PHOTOS panel needs to be the last one since it currently contains PayoutDetailsForm modal
// All the other panels can be reordered.
export const SUPPORTED_TABS = [DESCRIPTION, FISH_MOT_TYPES, HUNT_MOT_TYPES, FISH_TYPES, BIG_GAME_TYPES, SMALL_GAME_TYPES, UPLAND_GAME_TYPES,
  WATERFOWL_TYPES, LAND_TYPES, PUBLIC_LANDS, AGRICULTURE_TYPES, WATER_TYPES, POLICY, LOCATION, PRICING, PHOTOS];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

// When user has update draft listing, he should be redirected to next EditListingWizardTab
const redirectAfterDraftUpdate = (listingId, params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params,
    type: LISTING_PAGE_PARAM_TYPE_DRAFT,
    id: listingId,
  };
  const routes = routeConfiguration();

  // Replace current "new" path to "draft" path.
  // Browser's back button should lead to editing current draft instead of creating a new one.
  if (params.type === LISTING_PAGE_PARAM_TYPE_NEW) {
    const draftURI = createResourceLocatorString('EditListingPage', routes, currentPathParams, {});
    history.replace(draftURI);
  }

  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  const to = createResourceLocatorString('EditListingPage', routes, nextPathParams, {});
  history.push(to);
};

const EditListingWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    fetchInProgress,
    newListingPublished,
    history,
    images,
    listing,
    handleCreateFlowTabScrolling,
    handlePublishListing,
    onUpdateListing,
    onCreateListingDraft,
    onImageUpload,
    onUpdateImageOrder,
    onUpdateHeaderImage,
    onRemoveImage,
    onChange,
    updatedTab,
    updateInProgress,
    intl,
    onUpdateCategory,
  } = props;

  const { type } = params;
  const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
  const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
  const isNewListingFlow = isNewURI || isDraftURI;

  const currentListing = ensureListing(listing);
  const imageIds = images => {
    return images ? images.map(img => img.imageId || img.id) : null;
  };

  const onCompleteEditListingWizardTab = (tab, updateValues) => {
    // Normalize images for API call
    const { images: updatedImages, ...otherValues } = updateValues;
    const imageProperty =
      typeof updatedImages !== 'undefined' ? { images: imageIds(updatedImages) } : {};
    const updateValuesWithImages = { ...otherValues, ...imageProperty };

    if (isNewListingFlow) {
      const onUpsertListingDraft = isNewURI
        ? (tab, updateValues) => onCreateListingDraft(updateValues)
        : onUpdateListing;

      const upsertValues = isNewURI
        ? updateValuesWithImages
        : { ...updateValuesWithImages, id: currentListing.id };

      onUpsertListingDraft(tab, upsertValues)
        .then(r => {
          if (tab !== marketplaceTabs[marketplaceTabs.length - 1]) {
            // Create listing flow: smooth scrolling polyfill to scroll to correct tab
            handleCreateFlowTabScrolling(false);

            // After successful saving of draft data, user should be redirected to next tab
            redirectAfterDraftUpdate(r.data.data.id.uuid, params, tab, marketplaceTabs, history);
          } else {
            handlePublishListing(currentListing.id);
          }
        })
        .catch(e => {
          // No need for extra actions
        });
    } else {
      onUpdateListing(tab, { ...updateValuesWithImages, id: currentListing.id });
    }
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      listing,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
    };
  };

  const submitButtonTranslationKey = isNewListingFlow
    ? 'EditListingWizard.saveNew'
    : 'EditListingWizard.saveEdit';
  switch (tab) {
    case DESCRIPTION: {
      return (
        <EditListingDescriptionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
            onUpdateCategory(values.publicData.category)
          }}
        />
      );
    }
    case HUNT_MOT_TYPES:
    case FISH_MOT_TYPES:
    case LAND_TYPES:
    case WATER_TYPES:
    case AGRICULTURE_TYPES:
    case PUBLIC_LANDS:
    case FISH_TYPES:
    case BIG_GAME_TYPES:
    case SMALL_GAME_TYPES:
    case UPLAND_GAME_TYPES:
    case WATERFOWL_TYPES:
      // name of tab is name of options map
      return (
        <EditListingGenericListPanel
          {...panelProps(tab)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          optionsMap={tab}
          titleMsgId={'EditListingPanel.title.' + tab}
          createListingTitleMsgId={'EditListingPanel.createListingTitle.' + tab}
        />
      );
    case POLICY: {
      return (
        <EditListingPoliciesPanel
          {...panelProps(POLICY)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case LOCATION: {
      return (
        <EditListingLocationPanel
          {...panelProps(LOCATION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case PRICING: {
      return (
        <EditListingPricingPanel
          {...panelProps(PRICING)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
        />
      );
    }
    case PHOTOS: {
      // newListingPublished and fetchInProgress are flags for the last wizard tab
      return (
        <EditListingPhotosPanel
          {...panelProps(PHOTOS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          newListingPublished={newListingPublished}
          fetchInProgress={fetchInProgress}
          images={images}
          onImageUpload={onImageUpload}
          onRemoveImage={onRemoveImage}
          onSubmit={values => {
            onCompleteEditListingWizardTab(tab, values);
          }}
          onUpdateImageOrder={onUpdateImageOrder}
          onUpdateHeaderImage={onUpdateHeaderImage}
        />
      );
    }
    default:
      return null;
  }
};

EditListingWizardTab.defaultProps = {
  listing: null,
  updatedTab: null,
};

const { array, bool, func, object, oneOf, shape, string } = PropTypes;

EditListingWizardTab.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,
  errors: shape({
    createListingDraftError: object,
    publishListingError: object,
    updateListingError: object,
    showListingsError: object,
    uploadImageError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,
  images: array.isRequired,

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

  handleCreateFlowTabScrolling: func.isRequired,
  handlePublishListing: func.isRequired,
  onUpdateListing: func.isRequired,
  onCreateListingDraft: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onUpdateHeaderImage: func.isRequired,
  onRemoveImage: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,

  intl: intlShape.isRequired,
};

export default EditListingWizardTab;
