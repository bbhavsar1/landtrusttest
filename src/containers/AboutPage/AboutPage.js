import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import config from '../../config';
import ownership from './images/ownership.jpg';
import purpose from './images/purpose.jpg';

import { FormattedMessage } from 'react-intl';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { TopbarContainer } from '../../containers';

import css from './AboutPage.css';

export const AboutPageComponent = props => {
  const { intl, scrollingDisabled } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'AboutPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'AboutPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${ownership}`;

  class LocationImage extends Component {
    render() {
      const { alt, ...rest } = this.props;
      return <img alt={alt} {...rest} />;
    }
  }

  class EmailSectionStepContent extends Component {
    render() {
      const { titleId, textId, email } = this.props;
      const emailLink = 'mailto:' + email;
      return <div className={css.sectionStepDescriptionContainerThirds}>
        <h2 className={css.sectionStepTitle}>
          <FormattedMessage id={titleId} />
        </h2>
        <div className={css.sectionStepDescriptionText}>
          <FormattedMessage id={textId} /><a className={css.email} href={emailLink} target="_top">{email}</a>
        </div>
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
                <FormattedMessage id="AboutPage.heroTitle" />
              </h1>
            </div>
          </div>
          <ul className={css.sections}>
            <li>
              <div className={css.sectionContent}>
                <div className={css.sectionTitle}>
                  <FormattedMessage id="AboutPage.section1Title" />
                </div>
                <div className={css.sectionSteps}>
                  <div className={css.sectionStepReverse}>
                    <div className={css.sectionStepDescriptionContainer}>
                      <h2 className={css.sectionStepTitle}>
                        <FormattedMessage id="AboutPage.section1Part1Title" />
                      </h2>
                      <div className={css.sectionStepDescriptionText}>
                        <FormattedMessage id="AboutPage.section1Part1Text" />
                      </div>
                    </div>
                    <div className={css.imageWrapper}>
                      <div className={css.aspectWrapper}>
                        <LazyImage src={purpose} alt='purpose' className={css.locationImage} />
                      </div>
                    </div>
                  </div>
                  <div className={css.sectionStep}>
                    <div className={css.imageWrapper}>
                      <div className={css.aspectWrapper}>
                        <LazyImage src={ownership} alt='ownership' className={css.locationImage} />
                      </div>
                    </div>
                    <div className={css.sectionStepDescriptionContainer}>
                      <h2 className={css.sectionStepTitle}>
                        <FormattedMessage id="AboutPage.section1Part2Title" />
                      </h2>
                      <div className={css.sectionStepDescriptionText}>
                        <FormattedMessage id="AboutPage.section1Part2Text" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className={css.section}>
              <div className={css.sectionContent}>
                <div className={css.sectionTitle}>
                  <FormattedMessage id="AboutPage.section2Title" />
                </div>
                <div className={css.sectionSteps}>
                  <div className={css.sectionStep}>
                    <EmailSectionStepContent titleId="AboutPage.section2Part1Title" textId="AboutPage.section2Part1Text" email="support@landtrust.co" />
                    <EmailSectionStepContent titleId="AboutPage.section2Part2Title" textId="AboutPage.section2Part2Text" email="info@landtrust.co" />
                    <EmailSectionStepContent titleId="AboutPage.section2Part3Title" textId="AboutPage.section2Part3Text" email="media@landtrust.co" />
                  </div>
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

AboutPageComponent.propTypes = {
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
const AboutPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(AboutPageComponent);

export default AboutPage;
