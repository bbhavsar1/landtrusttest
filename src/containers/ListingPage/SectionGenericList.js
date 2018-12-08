import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SelectedGroup } from '../../components';

import css from './ListingPage.css';

const SectionGenericList = props => {
  const { options, selectedOptions, titleMsgId, selectGroupId } = props;
  return (
    <div className={css.genericListSection}>
      <h2 className={css.genericListTitle}>
        <FormattedMessage id={titleMsgId} />
      </h2>
      <SelectedGroup
        id={selectGroupId}
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionGenericList;