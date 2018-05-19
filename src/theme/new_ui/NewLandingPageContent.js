/*
    author: Alexander Zolotov
*/

import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withCookies, Cookies } from "react-cookie";

import "~/src/theme/new_ui/css/new_style.css";

import SignUpFormPopup from "~/src/authentication/SignUpForm";

import ActionLink from "~/src/components/common/ActionLink";

import { openSignUpForm } from "~/src/redux/actions/authorization";

import CharacterCreationFlow from "~/src/character-creation/CharacterCreationFlow";

import { startCharacterCreation } from "~/src/redux/actions/characterCreation";

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
      <div style={{ height: "100%" }}>
        {this.renderSignUpForm()}
        <CharacterCreationFlow
          onHandleSignUpFacebook={() => this.props.onHandleSignUpFacebook()}
          onHandleSignUpLinkedIn={() => this.props.onHandleSignUpLinkedIn()}
          onHandleCreationFinish={() => this.props.finishCharacterCreation()}
        />

        <section className="cover">
          <header className="navbar">
            <div className="logo-container skew">
              <img src="https://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/logo.png" className="unskew" />
            </div>
            <nav className="nav-container skew">
              <div className="unskew">
                <ul className="main-menu">
                  <li>
                    <a href="#" className="BTN">
                      The games
                    </a>
                  </li>
                  <li>
                    <a href="#" className="BTN">
                      Forums
                    </a>
                  </li>
                  <li>
                    <a href="#" className="BTN">
                      Markets
                    </a>
                  </li>
                  <li>
                    <a href="#" className="BTN btn-outline skew">
                      <span className="block unskew">Subscribe</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="BTN btn-solid-blue skew">
                      <span className="block unskew">Enterprise sign up</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <div className="flex-container">
            <div className="cover-body">
              <div className="skew">
                <div className="cover-card">
                  <div className="unskew">
                    <h1>Game up your passion</h1>
                    <p>Plug in for the Future. Explore a world of quests with friends and play them together to gain glory and rewards.</p>
                  </div>
                </div>
                <div className="row" style={{ marginTop: 10 + "px" }}>
                  <a href="#" className="BTN btn-solid-yellow f1 text-center">
                    <span className="unskew" style={{ display: "block" }}>
                      Explore Soqqle
                    </span>
                  </a>
                  <span style={{ display: "inline-block", width: 10 + "px" }}>&nbsp;</span>
                  <a href="#" className="BTN btn-solid-white f1 text-center">
                    <span className="unskew" style={{ display: "block" }}>
                      Sign In
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="f1">&nbsp;</div>
          </div>
        </section>
        <section className="black notch-top-right-black notch-bottom-left-black">
          <div className="CONTAINER center">
            <div className="lg-w60 text-center">
              <h1>
                Available now on Alpha.
                <span className="yellow">FREE</span>
              </h1>
              <p>Soqqle is a novel game that brings your heartfelt aspirations to real life.</p>

              <p>
                Join quests across different roles for the #futureofwork and team up with others to accomplish common goals! We call this -
                <span className="yellow">The Game For Life</span>. Isn’t this amazing?
              </p>

              <div className="dash">&nbsp;</div>
            </div>
          </div>
        </section>
        <section className="white notch-bottom-left-white">
          <div className="CONTAINER center">
            <div className="w60 text-center pv50">
              <h1>What is Soqqle?</h1>
              <div className="xs-col lg-row mt50">
                <div className="card">
                  <img src={require("./img/learning.png")} />
                  <h5>Drive purposeful learning</h5>
                </div>
                <div className="row-seprator">&nbsp;</div>
                <div className="card">
                  <img src={require("./img/social.png")} />
                  <h5>Combine social andlearning goals</h5>
                </div>
                <div className="row-seprator">&nbsp;</div>

                <div className="card">
                  <img src={require("./img/identity.png")} />
                  <h5>Helps identify networks to join the journey</h5>
                </div>
              </div>
              <h1 className="mt100">How it works?</h1>

              <div className="row center mt100">
                <div className="f1">
                  <div className="featured-image">
                    <img src={require("./img/featured-1.png")} className="l1" />
                    <img src={require("./img/featured-1.png")} className="l2" />
                    <img src={require("./img/featured-1.png")} className="l3" />
                  </div>
                </div>
                <div className="f2">
                  <div className="ml50">
                    <div className="seq-1 text-left" numbering="1">
                      <h3>1. Select your house.</h3>
                      <p>Join an environment where people similar to you gather and complete similar tasks. Develop together the same way.</p>

                      <p>
                        There are 6 houses available in BETA.
                        <br />Explore House >
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row-rev center mt100">
                <div className="f1">
                  <div className="featured-image">
                    <img src={require("./img/featured-2.png")} className="l-1" />
                    <img src={require("./img/featured-2.png")} className="l-2" />
                    <img src={require("./img/featured-2.png")} className="l3" />
                  </div>
                </div>
                <div className="f2">
                  <div className="seq-1 text-left" numbering="2">
                    <h3>2. Select a hero.</h3>
                    <p>Select a hero and develop it through tasks , answering questions, solving challenges individually or with your friends.</p>

                    <p>
                      There are 4 heros available in BETA.
                      <br />Explore Heroes >
                    </p>
                  </div>
                </div>
              </div>

              <div className="row center mt100">
                <div className="f1">
                  <div className="featured-image">
                    <img src={require("./img/featured-3.png")} className="l1" />
                    <img src={require("./img/featured-3.png")} className="l2" />
                    <img src={require("./img/featured-3.png")} className="l3" />
                  </div>
                </div>
                <div className="f2">
                  <div className="ml50">
                    <div className="seq-1 text-left" numbering="3">
                      <h3>3. Get a Reward.</h3>
                      <p>JCumulate SOQQ Sparks, Achievements and Bonuses upon the completion of tasks. Get more for doing Group Tasks.</p>

                      <p>
                        <br />Explore House >
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row-rev center mt100">
                <div className="f1">
                  <div className="featured-image">
                    <img src={require("./img/featured-4.png")} className="l-1" />
                    <img src={require("./img/featured-4.png")} className="l-2" />
                    <img src={require("./img/featured-4.png")} className="l3" />
                  </div>
                </div>
                <div className="f2">
                  <div className="seq-1 text-left" numbering="4">
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
        <section className="black">
          <div className="CONTAINER center">
            <h1 className="mt50">Discover Soqqle</h1>
            <h4>Video Goes here</h4>
          </div>
        </section>
        <section className="white notch-bottom-left-white">
          <div className="CONTAINER">
            <h1 className="mt50 text-center">Our blog</h1>
            <div className="row">
              <div className="f1 col">
                <div style={{ flex: 1, backgroundColor: "#666", margin: 10 + "px" }}>&nbsp;</div>
              </div>
              <div className="f1 col">
                <div className="f1">
                  <div style={{ height: 240 + "px", flex: 1, backgroundColor: "#666", margin: 10 + "px" }}>&nbsp;</div>
                </div>
                <div className="f1">
                  <div style={{ height: 240 + "px", flex: 1, backgroundColor: "#666", margin: 10 + "px" }}>&nbsp;</div>
                </div>
              </div>
            </div>
            <h1 className="mt50 text-center">They talk about us</h1>
            <h4 className="text-center">Card Component Goes Here</h4>
          </div>
        </section>
        <footer className="main-footer">
          <div className="CONTAINER center">
            <div className="footer-logo-container text-center">
              <img src="https://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/logo.png" />
            </div>
            <div className="subscribe text-center pv50">
              <span className="mp-semibold font22">Subscribe to our newsletter</span>
            </div>
            <ul className="menu-list mt50">
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

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  startCharacterCreation: bindActionCreators(startCharacterCreation, dispatch)
});

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LandingPageContent));
