import React, { Component } from 'react';

export const Footer = () => {
    return (
      <footer className="footer">
        <a href="/" className="footer-logo">
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"
            alt="logo"
          />
        </a>
        <h3>Subscribe to our Newsletter</h3>
        <div><input type="email" className="mail" value="Mail" /></div>
        <button type="button" className="subscribe"><p>Subscribe</p></button>
        <ul className="info-list">
          <li>About</li>
          <li>Support</li>
          <li>Contact</li>
          <li>Press</li>
        </ul>
        <h4>&#169;2018 SOQQLE, INC. ALL RIGHTS RESERVED.<br />
          All trademarks referenced herein are the properties of their respective owners.</h4>
        <ul className="privacy-list">
          <li><a href="/privacyPolicy" target="_blank">Privacy</a></li>
          <li><a href="/termsOfUse" target="_blank">Terms</a></li>
        </ul>
      </footer>
    );
  };