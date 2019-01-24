import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import config from '../../config';
import landowner1 from './images/landowner1.jpg';
import landowner2 from './images/landowner2.jpg';
import landowner3 from './images/landowner3.jpg';

import { FormattedMessage } from 'react-intl';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  NamedLink,
  Footer,
} from '../../components';

import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './FAQLandownersPage.css';

export const FAQLandownersPageComponent = props => {
  const { intl, scrollingDisabled } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'FAQLandownersPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'FAQLandownersPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  class LocationImage extends Component {
    render() {
      const { alt, ...rest } = this.props;
      return <img alt={alt} {...rest} />;
    }
  }

  class FAQSectionStepContent extends Component {
    render() {
      const { titleId, textId } = this.props;
      return <div className={css.sectionStepDescriptionContainer}>
        <div className={css.sectionStepTitleContainer}>
          <h2 className={css.sectionStepTitle}>
            <FormattedMessage id={titleId} />
          </h2>
        </div>
        <div className={css.sectionStepDescriptionText}>
          <FormattedMessage id={textId} />
        </div>
      </div>
    }
  }

  class FAQSectionStep extends Component {
    render() {
      const { titleId, textId } = this.props;
      return <div className={css.sectionStep}>
        <FAQSectionStepContent titleId={titleId} textId={textId} />
      </div>
    }
  }

  const LazyImage = lazyLoadWithDimensions(LocationImage);

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.heroContainer}>
            <div className={css.heroContent}>
              <h1 className={css.heroMainTitle}>
                <FormattedMessage id="FAQLandownersPage.heroTitle" />
              </h1>
              <h2 className={css.heroSubTitle}>
                <FormattedMessage id="FAQLandownersPage.heroDescription" />
              </h2>
            </div>
          </div>
          <ul className={css.sections}>
            <li>
              <div className={css.sectionContent}>
                <div className={css.sectionTitle}>
                  <FormattedMessage id="FAQLandownersPage.section1Title" />
                </div>
                <div className={css.sectionSteps}>
                  <div className={css.sectionStepReverse}>
                    <div className={css.sectionStepDescriptionContainer}>
                      <div className={css.sectionStepTitleContainer}>
                        <h2 className={css.sectionStepTitle}>
                          <FormattedMessage id="FAQLandownersPage.part1Title" />
                          <span className={css.sectionStepCount}>1</span>
                        </h2>
                      </div>
                      <div className={css.sectionStepDescriptionText}>
                        <FormattedMessage id="FAQLandownersPage.part1Text1" /><br />
                        <FormattedMessage id="FAQLandownersPage.part1Text2" /><br />
                        <FormattedMessage id="FAQLandownersPage.part1Text3" />
                      </div>
                    </div>
                    <div className={css.imageWrapper}>
                      <div className={css.aspectWrapper}>
                        <LazyImage src={landowner1} alt='landowner1' className={css.locationImage} />
                      </div>
                    </div>
                  </div>
                  <div className={css.sectionStep}>
                    <div className={css.imageWrapper}>
                      <div className={css.aspectWrapper}>
                        <LazyImage src={landowner2} alt='landowner2' className={css.locationImage} />
                      </div>
                    </div>
                    <div className={css.sectionStepDescriptionContainer}>
                      <div className={css.sectionStepTitleContainer}>
                        <h2 className={css.sectionStepTitle}>
                          <FormattedMessage id="FAQLandownersPage.part2Title" />
                          <span className={css.sectionStepCount}>2</span>
                        </h2>
                      </div>
                      <div className={css.sectionStepDescriptionText}>
                        <FormattedMessage id="FAQLandownersPage.part2Text1" />
                        <hr className={css.divider} />
                        <FormattedMessage id="FAQLandownersPage.part2Text2" />
                        <hr className={css.divider} />
                        <FormattedMessage id="FAQLandownersPage.part2Text3" />
                        <hr className={css.divider} />
                        <FormattedMessage id="FAQLandownersPage.part2Text4" />
                        <NamedLink name="FAQLandownersPage">
                          <button className={css.helpButton}>
                            <FormattedMessage id="FAQLandownersPage.listingHelpButton" />
                          </button>
                        </NamedLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className={css.section}>
              <div className={css.sectionContent}>
                <div className={css.sectionTitle}>
                  <FormattedMessage id="FAQLandownersPage.section2Title" />
                </div>
                <div className={css.sectionSteps}>
                  <div className={css.sectionStep}>
                    <FAQSectionStepContent titleId="FAQLandownersPage.section2Part1Title" textId="FAQLandownersPage.section2Part1Text" />
                    <FAQSectionStepContent titleId="FAQLandownersPage.section2Part2Title" textId="FAQLandownersPage.section2Part2Text" />
                  </div>
                  <div className={css.sectionStep}>
                    <div className={css.sectionStepDescriptionContainer}>
                      <div className={css.sectionStepTitleContainer}>
                        <h2 className={css.sectionStepTitle}>
                          <FormattedMessage id="FAQLandownersPage.section2Part3Title" />
                        </h2>
                      </div>
                      <div className={css.sectionStepDescriptionText}>
                        <span className={css.boldH4}><FormattedMessage id="FAQLandownersPage.section2Part3Text1" /></span>
                        <FormattedMessage id="FAQLandownersPage.section2Part3Text2" />
                        <br />
                        <span className={css.boldH4}><FormattedMessage id="FAQLandownersPage.section2Part3Text3" /></span>
                        <FormattedMessage id="FAQLandownersPage.section2Part3Text4" />
                      </div>
                    </div>
                    <div className={css.sectionStepDescriptionContainer}>
                      <div className={css.sectionStepTitleContainer}>
                        <h2 className={css.sectionStepTitle}>
                          <FormattedMessage id="FAQLandownersPage.section2Part4Title" />
                        </h2>
                      </div>
                      <div className={css.sectionStepDescriptionText}>
                        <FormattedMessage id="FAQLandownersPage.section2Part4Text" />
                      </div>
                    </div>
                  </div>
                  <div className={css.sectionStep}><div className={css.imageWrapper2}>
                    <LazyImage src={landowner3} alt='landowner3' className={css.locationImage2} />
                  </div>
                  </div>
                </div>
              </div>
            </li>
            <li className={css.section}>
              <div className={css.sectionContent}>
                <div className={css.sectionTitle}>
                  <FormattedMessage id="FAQLandownersPage.section3Title" />
                </div>
                <div className={css.sectionSteps}>
                  <FAQSectionStep titleId="FAQLandownersPage.section3Part1Title" textId="FAQLandownersPage.section3Part1Text" />
                  <FAQSectionStep titleId="FAQLandownersPage.section3Part2Title" textId="FAQLandownersPage.section3Part2Text" />
                  <FAQSectionStep titleId="FAQLandownersPage.section3Part3Title" textId="FAQLandownersPage.section3Part3Text" />
                  <FAQSectionStep titleId="FAQLandownersPage.section3Part4Title" textId="FAQLandownersPage.section3Part4Text" />
                  <FAQSectionStep titleId="FAQLandownersPage.section3Part5Title" textId="FAQLandownersPage.section3Part5Text" />
                  <FAQSectionStep titleId="FAQLandownersPage.section3Part6Title" textId="FAQLandownersPage.section3Part6Text" />
                </div>
              </div>
            </li>
          </ul>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

const { bool, object } = PropTypes;

FAQLandownersPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const FAQLandownersPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(FAQLandownersPageComponent);

export default FAQLandownersPage;
