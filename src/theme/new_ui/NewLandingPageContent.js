/*
    author: Alexander Zolotov
*/

import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withCookies, Cookies } from "react-cookie";

import "~/src/theme/new_ui/css/new_style.css";
import img from "~/src/theme/new_ui/img";

import SignUpFormPopup from "~/src/authentication/SignUpForm";

import ActionLink from "~/src/components/common/ActionLink";

import { openSignUpForm } from "~/src/redux/actions/authorization";

import CharacterCreationFlow from "~/src/character-creation/CharacterCreationFlow";

import { startCharacterCreation } from "~/src/redux/actions/characterCreation";

const FeaturedImage = ({ source }) => {
  return (
    <div style={LOCAL_STYLES.featuredImage} className="featured-image">
      <img src={source} className="l1 img-responsive" />
      <img src={source} className="l2 img-responsive" />
      <img src={source} className="l3 img-responsive" />
    </div>
  );
};

class LandingPageContent extends React.Component {
  constructor(props) {
    super(props);
  }

  startCharacterCreation() {
    this.props.startCharacterCreation();
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

  render() {
    return (
      <div className="🏠">
        {this.renderSignUpForm()}
        <CharacterCreationFlow onHandleSignUpFacebook={() => this.props.onHandleSignUpFacebook()} onHandleSignUpLinkedIn={() => this.props.onHandleSignUpLinkedIn()} onHandleCreationFinish={() => this.props.finishCharacterCreation()} />
        <section className="cover flex-column">
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#newlanding-navbar" aria-expanded="false">
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="#">
                  <img src="https://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/logo.png" style={LOCAL_STYLES.headerLogo} />
                </a>
              </div>
              <div className="collapse navbar-collapse skew-md" id="newlanding-navbar">
                <ul className="nav navbar-nav navbar-right">
                  <li className="unskew-md">
                    <a href="#">The games</a>
                  </li>
                  <li className="unskew-md">
                    <a href="#">Forums</a>
                  </li>
                  <li className="unskew-md">
                    <a href="#">Markets</a>
                  </li>
                  <li>
                    <a className="btn btn-outline">
                      <div className="unskew-md">Subscribe</div>
                    </a>
                  </li>
                  <li>
                    <a className="btn btn-primary">
                      <div className="unskew-md">Enterprise sign up</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container flex-column jcenter">
            <div className="row">
              <div className="col-md-6 skew ph50">
                <div className="cover-card">
                  <div className="unskew">
                    <h1>Game up your passion</h1>
                    <p>Plug in for the Future. Explore a world of quests with friends and play them together to gain glory and rewards.</p>
                  </div>
                </div>
                <div className="flex-row">
                  <a href="#" className="btn btn-warning f1 text-center">
                    <span className="unskew iblock">Explore Soqqle</span>
                  </a>
                  &nbsp;
                  <a href="#" className="btn btn-default f1 text-center" onClick={() => this.props.openSignUpForm()}>
                    <span className="unskew iblock">Sign In</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bgblack notch-top-right-black notch-bottom-left-black">
          <div className="container center">
            <div className="lg-w60 text-center">
              <h1>
                Available now on Alpha.&nbsp;
                <span className="yellow">FREE</span>
              </h1>
              <p>Soqqle is a novel game that brings your heartfelt aspirations to real life.</p>

              <p>
                Join quests across different roles for the #futureofwork and team up with others to accomplish common goals! We call this -
                <span className="yellow"> The Game For Life </span>. Isn’t this amazing?
              </p>

              <div className="dash">&nbsp;</div>
            </div>
          </div>
        </section>
        <section className="bgwhite notch-bottom-left-white">
          <div className="container">
            <div className="w60 text-center pv50">
              <h1 className="mt100">What is Soqqle?</h1>
              <div className="row mt50 cards-container">
                <div className="panel panel-default">
                  <div className="panel-body text-cemnter">
                    <img src={img.learning} />
                    <h5>Drive purposeful learning</h5>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-body">
                    <img src={img.social} />
                    <h5>Combine social andlearning goals</h5>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-body">
                    <img src={img.identity} />
                    <h5>Helps identify networks to join the journey</h5>
                  </div>
                </div>
              </div>
              <h1 className="mt100">How it works?</h1>

              <div className="row mt50">
                <div className="col-md-6">
                  <FeaturedImage source={img.featured1} />
                </div>
                <div className="col-md-6">
                  <div className="seq text-left" data-numbering="1">
                    <h3>1. Select your house.</h3>
                    <p>Join an environment where people similar to you gather and complete similar tasks. Develop together the same way.</p>

                    <p>
                      There are 6 houses available in BETA.
                      <br />Explore House >
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-md-push-6">
                  <FeaturedImage source={img.featured2} />
                </div>
                <div className="col-md-6 col-md-pull-6">
                  <div className="seq text-left" data-numbering="2">
                    <h3>2. Select a hero.</h3>
                    <p>Select a hero and develop it through tasks , answering questions, solving challenges individually or with your friends.</p>

                    <p>
                      There are 4 heros available in BETA.
                      <br />Explore Heroes >
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <FeaturedImage source={img.featured3} />
                </div>
                <div className="col-md-6">
                  <div className="seq text-left" data-numbering="3">
                    <h3>3. Get a Reward.</h3>
                    <p>JCumulate SOQQ Sparks, Achievements and Bonuses upon the completion of tasks. Get more for doing Group Tasks.</p>

                    <p>
                      <br />Explore House >
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-md-push-6">
                  <FeaturedImage source={img.featured4} />
                </div>
                <div className="col-md-6 col-md-pull-6">
                  <div className="seq text-left" data-numbering="4">
                    <h3>4. Use your Rewards.</h3>
                    <p>SOQQ Sparks are powered by Blockchain Force. Use them to boost experience gain, or obtain character upgrades.</p>

                    <p>
                      <br />Explore House >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bgblack">
          <div className="container center">
            <h1 className="mt50">Discover Soqqle</h1>
            <h4>Video Goes here</h4>
          </div>
        </section>
        <section className="bgwhite notch-bottom-left-white">
          <div className="container">
            <h1 className="mt50 text-center">Our blog</h1>
            <div className="row">
              <div className="f1 col">
                <div>&nbsp;</div>
              </div>
              <div className="f1 col">
                <div className="f1">
                  <div>&nbsp;</div>
                </div>
                <div className="f1">
                  <div>&nbsp;</div>
                </div>
              </div>
            </div>
            <h1 className="mt50 text-center">They talk about us</h1>
            <h4 className="text-center">Card Component Goes Here</h4>
          </div>
        </section>
        <footer className="main-footer">
          <div className="container center">
            <div className="footer-logo-container text-center mt50">
              <img src="https://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/logo.png" />
            </div>
            <div className="subscribe text-center pv50">
              <span className="mp-semibold font22">Subscribe to our newsletter</span>
            </div>
            <ul className="list-unstyled mt50 text-center footer-menu">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
            </ul>
            <div className="copyright text-center mt50">
              <p className="dark-grey">
                ©2018 SOQQLE, INC. ALL RIGHTS RESERVED.
                <br /> All trademarks referenced herein are the properties of their respective owners.
              </p>
              <a href="#">PRIVACY</a> |
              <a href="#">TERMS</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

LandingPageContent.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  isSignUpFormOpen: PropTypes.bool.isRequired,
  startCharacterCreation: PropTypes.func.isRequired
};

const LOCAL_STYLES = {
  featuredImage: {},
  headerLogo: {
    height: "36px"
  }
};

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  startCharacterCreation: bindActionCreators(startCharacterCreation, dispatch)
});

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LandingPageContent));
