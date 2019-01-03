import React from 'react';
import PropTypes from 'prop-types';

const IconLogo = props => {
  const { className, ...rest } = props;

  return (
    <svg
      className={className}
      {...rest}
      height="31.2"
      width="auto"
      viewBox="-4 0 31.2 31.2"
      xmlns="http://www.w3.org/2000/svg"
    >

      <path xmlns="http://www.w3.org/2000/svg" d="M0,0v19.3c0,3.7,2,7,5.9,9.4c2.8,1.8,5.6,2.4,5.7,2.5l0.3,0.1l0.3-0.1c0.1,0,2.9-0.7,5.7-2.5   c3.9-2.4,5.9-5.7,5.9-9.4V0H0z M2.2,10.2h19.4v5.2c-3.4-1.1-6.7-0.2-10,0.6c-3.3,0.9-6.4,1.7-9.4,0.4C2.2,16.4,2.2,10.2,2.2,10.2z    M21.6,2.2V8H2.2V2.2H21.6z M11.9,28.9c-0.6-0.2-2.1-0.7-3.8-1.6l3.9-2.2l3.8,2.1C14.1,28.2,12.5,28.7,11.9,28.9z M17.9,26L12,22.7   L6,26c-2-1.5-3.8-3.7-3.8-6.8v-0.4c1.1,0.4,2.3,0.5,3.4,0.5c2.2,0,4.4-0.6,6.6-1.1c3.3-0.9,6.4-1.7,9.4-0.4v1.5   C21.6,22.3,19.9,24.4,17.9,26z" />

    </svg>
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
};

export default IconLogo;
