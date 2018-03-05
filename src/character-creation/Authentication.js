import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {getPopupParentElement} from "~/src/common/PopupUtils.js"

import {Icon} from 'react-fa'

import {ProgressBar} from 'react-bootstrap'

import "./common.css"
import "./authentication.css"

class Authentication extends React.Component {
    constructor(props) {
      super(props);
      this.modalDefaultStyles = {};
    }

    componentWillMount() {
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.background = "white";
      Modal.defaultStyles.content.color = 'initial';
      Modal.defaultStyles.content["height"] = '85%';
      Modal.defaultStyles.content["width"] = '75%';
      Modal.defaultStyles.content["minWidth"] = 'initial';
      Modal.defaultStyles.content["maxWidth"] = 'initial';
      Modal.defaultStyles.content["overflowX"] = "hidden";
      Modal.defaultStyles.content["overflowY"] = "scroll";
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
    }
      
    componentWillUnmount() {
      Modal.defaultStyles = this.modalDefaultStyles;
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
      this.props.onHandleSignUpFacebook()
    }

    handleSignUpLinkedIn() {
      this.props.onHandleCreationFinish();
      this.props.onHandleSignUpLinkedIn()
    }

    render() {
        return (
          <Modal isOpen={true} onRequestClose={() => {}} contentLabel={"Character Selection"} 
            parentSelector={getPopupParentElement}>
            <Icon onClick={()=>this.handleClose()} className="character-creation-popup-close-icon" 
                name="times" aria-hidden="true"></Icon>
            <div id="character-authenticate-container">
              <div id="character-authenticate-container-inner">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="text-center" id="character-seelection-header">
                      <h3 className="text-uppercase">Plug In</h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="character-creation-authenticate-button-container text-center">
                      <button className="btn btn-primary character-creation-auth-button" onClick={()=>this.handleSignUpFacebook()}>
                        Login with Facebook
                      </button>
                      <button className="btn btn-primary character-creation-auth-button" onClick={()=>this.handleSignUpLinkedIn()}>
                        Login with LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p>
                      By clicking on any of the above authentication methods, 
                      you agree yo our t and c's and confirm that you have read our 
                      Data Privacy (which includes our Cookie Use Plociy).
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="character-creation-progressbar-container">
                          <ProgressBar striped bsStyle="danger" now={this.props.progressValue} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )
    }
  }

  Authentication.propTypes = {
  }
 
  export default require('react-click-outside')(Authentication);