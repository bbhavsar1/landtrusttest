import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../components';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import css from './SectionLandowners.css';
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, desc, image, buttonDesc, buttonClass) => {
  return (
    <div className={css.column}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}><FormattedMessage id={name} /></div>
      <div className={css.descText}><FormattedMessage id={desc} /></div>
      <NamedLink name="FAQLandownersPage">
        <button className={buttonClass}>
          <FormattedMessage id={buttonDesc} />
        </button>
      </NamedLink>
    </div>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLandowners.title" />
      </div>
      <div className={css.columns}>
        {locationLink(
          'SectionLandowners.title1',
          'SectionLandowners.desc1',
          image1,
          'SectionLandowners.button1',
          css.faqButton
        )}
        {locationLink(
          'SectionLandowners.title2',
          'SectionLandowners.desc2',
          image2,
          'SectionLandowners.button2',
          css.faqButton
        )}
        {locationLink(
          'SectionLandowners.title3',
          'SectionLandowners.desc3',
          image3,
          'SectionLandowners.button3',
          css.signupButton
        )}
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
