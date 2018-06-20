/*
  author: Anna Kuzii
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom'; //temporarily here, remove it!!!!!!!
import { openSignUpForm } from '~/src/redux/actions/authorization';
import SignUpFormPopup from '~/src/authentication/SignUpForm';
import Authorize from '~/src/authentication/Authorize';
import LandingPageContent from "~/src/theme/components/landingPage/LandingPageContent";
import Houses from "~/src/theme/components/houses/Houses";
import '~/src/theme/css/landingPage.css';

const EmailInput = ({onEmailInputHide, onEmailInputSubmit, onEmailInput, email}) => {
  return (
    <span onMouseLeave={onEmailInputHide}>
      <span className="landing-email-input-container" key={"landing-email-input-container"}>
        <input value={email} 
        onChange={onEmailInput}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onEmailInputSubmit(event)
          }
        }}
        type="email" placeholder="email@example.com" autoFocus={true} />
      </span>,
    <button key={"landing-email-input-container_button"} type="submit" onClick={onEmailInputSubmit}><p>Send</p></button>
    </span>
  )
}

const Footer = () => {
  return (
    <footer className="footer">
      <img
        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png" />
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
        <li>Privacy</li>
        <li> Terms</li>
      </ul>
    </footer>
  );
};

const Header = ({ openMenu, onEmailInputShow, onEmailInputHide, onEmailInputSubmit, onEmailInput, isEmailInputVisible, email}) => {
  return (
    <div className="header">
      <button className="burger" onClick={openMenu}>
        <span> </span>
        <span> </span>
        <span> </span>
      </button>
      <button type="button">
        <p>The Game</p>
      </button>
      <button type="button">
        <p>Forums</p>
      </button>
      <button type="button">
        <p>Markets</p>
      </button>
      {!isEmailInputVisible ? <button type="button" className="subscribe-button" onClick={onEmailInputShow}>
        <p>Subscribe</p>
      </button>
        :
        <EmailInput onEmailInputHide={onEmailInputHide} onEmailInputSubmit={onEmailInputSubmit} onEmailInput={onEmailInput} email={email}/>}
      <button type="button" className="sign-up-button">
        <p>Enterprise sign up</p>
      </button>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <img
        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"
        alt="logo"
      />
    </div>
  );
};

const MobileMenu = ({ isOpen, closeMenu, onEmailInputShow, onEmailInputHide, onEmailInputSubmit, onEmailInput, isEmailInputVisible, email }) => {
  const mobileClass = isOpen ? 'mobile-menu open' : 'mobile-menu close';

  return (
    <div className={mobileClass}>
      <button type="button" className="close-menu" onClick={closeMenu}>
        <span>x</span>
      </button>
      <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png" />
      <ul>
        <li>The games</li>
        <li>Forums</li>
        <li>Markets</li>
      </ul>
      <footer>
        <button type="button" className="subscribe-button"><p>Subscribe</p></button>
        <button type="button" className="sign-up-button"><p>Enterprise sign up</p></button>
      </footer>
    </div>
  );
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, isEmailInputVisible: false, email: ""};

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleEmailInputShow(show) {
    this.setState({ isEmailInputVisible: show });
  }

  handleEmailInputSubmit(event) {
    event.preventDefault();
    console.log('handleEmailInputSubmit');
    this.setState({email: "", isEmailInputVisible: false});
  }

  handleEmailInput(event) {
    console.log('handleEmailInput');
    this.setState({email: event.target.value});
  }

  renderSignUpForm() {
    return this.props.isSignUpFormOpen ? (
      <SignUpFormPopup
        modalIsOpen={this.props.isSignUpFormOpen}
        isAuthorized={this.props.isAuthorized}
        onCloseModal={() => this.props.onCloseSignUpModal()}
        onHandleSignUpFacebook={() => this.props.onHandleSignUpFacebook()}
        onHandleSignUpLinkedIn={() => this.props.onHandleSignUpLinkedIn()}
        pathname={this.props.pathname}
      />
    ) : null;
  }

  renderRoutes() {
    return (
      <Switch>
        <Route exact path='/' render={routeProps => <LandingPageContent {...routeProps}{...this.props} />} />
        <Route path='/authorize' render={routeProps => <Authorize {...routeProps}{...this.props} />} />
        <Route exact path='/houses' render={routeProps => <Houses {...routeProps}{...this.props} />} />
        <Route path="*" render={routeProps => <LandingPageContent {...routeProps}{...this.props} />} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="landing-page-wrapper">
        {this.renderSignUpForm()}
        <header>
          <Logo />
          <Header openMenu={this.toggle}
            onEmailInputShow={() => this.handleEmailInputShow(true)}
            onEmailInputHide={() => this.handleEmailInputShow(false)}
            onEmailInputSubmit={(event) => {this.handleEmailInputSubmit(event)}}
            onEmailInput={(event) => {this.handleEmailInput(event)}}
            isEmailInputVisible={this.state.isEmailInputVisible}
            email={this.state.email}/>
        </header>
        {this.renderRoutes() /*This is temporary - remove it!!!!!!!!*/}
        <Footer />
        <MobileMenu isOpen={this.state.isOpen} closeMenu={this.toggle} 
            onEmailInputShow={() => this.handleEmailInputShow(true)}
            onEmailInputHide={() => this.handleEmailInputShow(false)}
            onEmailInputSubmit={(event) => {this.handleEmailInputSubmit(event)}}
            onEmailInput={(event) => {this.handleEmailInput(event)}}
            isEmailInputVisible={this.state.isEmailInputVisible}
            email={this.state.email}/>
      </div>
    );
  }
}

LandingPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  isSignUpFormOpen: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
});

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(LandingPage));
