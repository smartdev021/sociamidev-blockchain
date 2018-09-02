import React, { Component } from 'react';

export const MobileMenu = ({ isOpen, closeMenu, onEmailInputShow, onEmailInputHide, onEmailInputSubmit, onEmailInput, isEmailInputVisible, email }) => {
    const mobileClass = isOpen ? 'mobile-menu open' : 'mobile-menu close';
  
    const handleInputSubmit = (event) => {
      event.preventDefault();
      if (validateEmail(email)) {
        onEmailInputSubmit(email);
      }
    }
  
    return (
      <div className={mobileClass}>
        <button type="button" className="close-menu" onClick={closeMenu}>
          <span>x</span>
        </button>
        <div className="mobile-logo">
          <a href="/">
            <img
              src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"
              alt="logo"
            />
          </a>
        </div>
        <ul>
          <li>The games</li>
          <li>Forums</li>
          <li>Markets</li>
        </ul>
        <footer>
          <div className="mobile-menu-email-subscribe-container">
            <div className="landing-email-input-textfield-container">
              <input value={email}
                onKeyPress={(event) => {
                  //doesn't make sense for mobile, but her for consistency
                  if (event.key === 'Enter') {
                    handleInputSubmit(event)
                  }
                }}
                onChange={onEmailInput}
                type="email" placeholder="email@example.com" autoFocus={true} required={true} />
            </div>
          </div>
          <button type="button" className="subscribe-button" onClick={handleInputSubmit}><p>Subscribe</p></button>
          <button type="button" className="sign-up-button"><p>Enterprise sign up</p></button>
        </footer>
      </div>
    );
  };