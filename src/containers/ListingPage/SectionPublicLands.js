import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SelectedGroup } from '../../components';

import css from './ListingPage.css';

const SectionPublicLands = props => {
  const { options, selectedOptions } = props;
  return (
    <div className={css.sectionPublicLands}>
      <h2 className={css.publicLandsTitle}>
        <FormattedMessage id="ListingPage.publicLandsTitle" />
      </h2>
      <SelectedGroup
        id="ListingPage.publicLands"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionPublicLands;
