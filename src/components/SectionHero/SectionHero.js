import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { TopbarSearchForm } from '../../forms';
import { createResourceLocatorString } from '../../util/routes';

import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className, history, currentSearchParams } = props;

  const classes = classNames(rootClassName || css.root, className);

  const handleSubmit = (values) => {
    const { search, selectedPlace } = values.location;
    const { } = props;
    const { origin, bounds } = selectedPlace;
    const originMaybe = config.sortSearchByDistance ? { origin } : {};
    const searchParams = {
      ...currentSearchParams,
      ...originMaybe,
      address: search,
      bounds,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id="SectionHero.title" />
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>
        <TopbarSearchForm
          className={css.searchLink}
          desktopInputRoot={css.topbarSearchWithLeftPadding}
          form="TopbarSearchFormDesktop"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
