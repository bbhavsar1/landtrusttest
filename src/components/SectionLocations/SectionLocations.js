import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.css';

import huntImage from './images/hunt.jpg';
import fishImage from './images/fish.jpg';
import accessImage from './images/access.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, desc, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  const descText = <span className={css.locationDesc}>{desc}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>{nameText}</div>
      <div className={css.descText}>{descText}</div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Hunt',
          'Find properties for hunting big game, small game, upland birds, & waterfowl.',
          huntImage,
          '?address=United%20States&bounds=71.540724%2C-64.464198%2C-14.6528%2C-179.9&pub_category=hunt'
        )}
        {locationLink(
          'Fish',
          'Find properties for fishing streams, rivers, & ponds.',
          fishImage,
          '?address=United%20States&bounds=71.540724%2C-64.464198%2C-14.6528%2C-179.9&pub_category=fish'
        )}
        {locationLink(
          'Access',
          'Find properties through which you can access "landlocked" public lands.',
          accessImage,
          '?address=United%20States&bounds=71.540724%2C-64.464198%2C-14.6528%2C-179.9&pub_category=access'
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
