import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Icon } from 'react-fa';

import '~/src/theme/css/characterAuthentication.css';

class CharacterAuthentication extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
  }

  componentWillUnmount() {
    
  }

  handleClickOutside() {
    /* () => this.handleClose();*/
  }

  handleClose() {
    this.props.onClose();
  }

  handleCharacterSelectConfirm() {
    this.props.onClose();
  }

  handleSignUpFacebook() {
    this.props.onHandleCreationFinish();
    this.props.onHandleSignUpFacebook();
  }

  handleSignUpLinkedIn() {
    this.props.onHandleCreationFinish();
    this.props.onHandleSignUpLinkedIn();
  }

  render() {
    return (
      <div className="materialize-warper authentication-wrapper">
        {/* <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/characterCreation/select-trait-background.png" alt="step background" /> */}
        <div className="container">
          <div className="row">
            <div className="character-wizard-steps">
                <div className="wizard-circle" style={{float:'left'}}></div>
                <div className="wizard-step">SELECT YOUR TRAITS</div>
                <div className="wizard-line"></div>
                <div className="wizard-circle"></div>
                <div className="wizard-step">SELECT YOUR HOUSE</div>
                <div className="wizard-line"></div>
                <div className="active-wizard-circle"></div>
                <div className="wizard-step active" style={{float:'right'}}>PLUGIN</div>
            </div>
            <div className="character-wizard-steps-mobile">
              <div className="col-xs-6 step-1">
                  <div className="wizard-circle" style={{float:'left'}}></div>
                  <div className="wizard-line" style={{float:'right'}}></div>
                  <div className="wizard-step" >SELECT YOUR HOUSE</div>
              </div>
              <div className="col-xs-6 step-2">
                  <div className="active-wizard-circle" style={{float:'left'}}></div>
                  <div className="wizard-line" style={{float:'right'}}></div>
                  <div className="wizard-step active">PLUGIN</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="authentication-card">
              <div className="col-md-5 account-creation">
                <h5>Create an Account</h5>
                  <button className="btn auth-facebook-button" onClick={() => this.handleSignUpFacebook()}>
                    <i className="fa fa-facebook" style={{marginRight:'10px'}}></i>
                    Login with Facebook
                  </button>
                  <button className="btn auth-linkedin-button" onClick={() => this.handleSignUpLinkedIn()}>
                    <i className="fa fa-linkedin" style={{marginRight:'10px'}}></i>
                    Login with LinkedIn
                  </button>
                <p>or</p>
                <div>

                  <div className="form-group-auth">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="auth-input" id="name" placeholder="" />
                  </div>

                  <div className="form-group-auth">
                      <label htmlFor="email">Email or mobile phone number</label>
                      <input type="text" className="auth-input" id="email" placeholder="" />
                  </div>

                  <div className="form-group-auth">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="password-input" id="password" placeholder="" />
                  </div>

                </div>
                <div>
                  <button className="btn auth-create-button">Create</button>
                </div>
              </div>
              <div className="col-md-7 account-tnc">
                <p className="authentication-tnc">
                By clicking on any ot the above authentication methods, you agree to our t&c's and 
                confirm that you have read our 
                <Link to="/privacyPolicy" target="_blank">
                 Data Privacy </Link>
                (which incudes our Cookie Use Policy) and 
                our 
                <Link to="/termsOfUse" target="_blank">
                 Terms of Use </Link>
                </p>
                <p className="authentication-para">
                *The Soqqle Platform is currently on Alpha and subject to changes 
                based on feasibility of features that may be intro-duced, revised, 
                updated or otherwise changed from time to time. As a result, content and 
                related achievements(eg levels and tokens) MAY be wiped out before our Go Live. 
                </p>
                <p className="authentication-para">
                *Soqqle is a platform to encourage personal growth by making learning fun. 
                </p>
                <p className="authentication-para">
                We encourage you to support collaboration by maintaining courtesy and integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <Modal
      //   isOpen={true}
      //   onRequestClose={() => {}}
      //   contentLabel={'Character Selection'}
      //   parentSelector={getPopupParentElement}
      // >
      //   <Icon
      //     onClick={() => this.handleClose()}
      //     className="character-creation-popup-close-icon"
      //     name="times"
      //     aria-hidden="true"
      //   />
      //   <div id="character-authenticate-container">
      //     <div id="character-authenticate-container-inner">
      //       <div className="box-head">
      //         <h1 className="text-center text-uppercase text-heading heading-border heading-border-decorators-visible">
      //           <span>Plug In</span>
      //         </h1>
      //       </div>
      //       <div className="container-fluid">
      //         <div className="row">
      //           <div className="col-lg-12">
      //             <div className="text-center" id="character-creation-authenticate-button-container">
      //               <span
      //                 className="character-creation-auth-button"
      //                 id="character-creation-button-facebook"
      //                 onClick={() => this.handleSignUpFacebook()}
      //               >
      //                 <Icon className="character-creation-social-icon" name="facebook" />Login with Facebook
      //               </span>
      //               <span
      //                 className="character-creation-auth-button"
      //                 id="character-creation-button-linkedin"
      //                 onClick={() => this.handleSignUpLinkedIn()}
      //               >
      //                 <Icon className="character-creation-social-icon linkedin" name="linkedin" />Login with
      //                 LinkedIn
      //               </span>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="row">
      //           <div className="col-lg-12">
      //             <div className="text-center" id="character-creation-authorization-disclaimer">
      //               <p className="character-creation-paragraph" id="character-creation-paragraph-primary">
      //                 <b>
      //                   By clicking on any of the above authentication methods, you agree to our t&c&apos;s{' '}
      //                   <br /> and confirm that you have read our
      //                   <Link to="/privacyPolicy" target="_blank">
      //                     {' '}
      //                     Data Privacy
      //                   </Link>
      //                   {' (which includes our Cookie Use Plociy) and our '}
      //                   <Link to="/termsOfUse" target="_blank">
      //                     {' '}
      //                     Terms of Use
      //                   </Link>
      //                 </b>
      //               </p>
      //               <hr />
      //               <p className="character-creation-paragraph">
      //                 &#42;The Soqqle Platform is currently on Alpha and subject to changes based on
      //                 feasibility of features that may be introduced, revised, updated or otherwise changed
      //                 from time to time. As a result, content and related achievements (eg levels and tokens)
      //                 MAY be wiped out before our Go Live.
      //               </p>
      //               <p className="character-creation-paragraph" id="character-creation-paragraph-secondary">
      //                 &#42;We currently do not support non Facebook/LinkedIn authentication methods but plan
      //                 to do so in the near future.
      //               </p>
      //               <p className="character-creation-paragraph" id="character-creation-paragraph-tertiary">
      //                 &#42;Soqqle is a platform to encourage personal growth by making learning fun.
      //               </p>
      //               <p>We encourage you to support collaboration by maintaining courtesy and integrity.</p>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="character-creation-progressbar-container">
      //         <ProgressBar striped bsStyle="danger" now={this.props.progressValue} />
      //       </div>
      //     </div>
      //   </div>
      // </Modal>
    );
  }
}

CharacterAuthentication.propTypes = {};

export default require('react-click-outside')(CharacterAuthentication);
