import React from 'react';
import logoImage from '../../../../assets/img/logo.png';

export const Logo = () => {
  return (
    <div className="logo pt-12">
      <a href="/">
        <img
          src={logoImage}
          alt="logo"
          className="f-w"
        />
      </a>
    </div>
  );
};
