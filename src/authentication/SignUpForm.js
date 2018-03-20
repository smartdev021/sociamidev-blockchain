import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import "~/src/css/signUpFormPopup.css"

class SignupForm extends React.Component {
    constructor(props) {
      super(props);

      this.modalDefaultStyles = {};
    }

    //TODO: Elaborate more robust force-signup mechanism. Probably, get rid of popup in favor of /login route
    isSignupRequired() {
     return (this.props.pathname == "/projectManagement" && !this.props.isAuthorized);
    }

    componentWillMount() {
      console.log("componentWillMount");
      if (this.props.isAuthorized) {
        this.props.onCloseModal()
      }

      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.border = "none";
      Modal.defaultStyles.content.background = "transparent";
      Modal.defaultStyles.content.overflow = "hidden";
      Modal.defaultStyles.content["color"] = 'white';
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["minWidth"] = '260px';
      Modal.defaultStyles.content["maxWidth"] = '380px';
      Modal.defaultStyles.content["height"] = '300px';
      Modal.defaultStyles.content["boxShadow"] = 'none';
    }

    componentWillUnmount() {
      console.log("componentWillUnmount");
      Modal.defaultStyles = this.modalDefaultStyles;
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.isAuthorized != this.props.isAuthorized) {
        if (this.props.isAuthorized) {
          this.props.onCloseModal()
        }
      }
    }

    renderForm() {
        return (
          <Modal isOpen={this.props.modalIsOpen} onRequestClose={() => this.handleRequestClose()} contentLabel="Login Form">
            <div className="popup-signup-form">       
              <h2 className="form-sign-u-heading">Sign Up</h2>

              <button type="button" className="btn btn-lg btn-primary btn-block" 
               onClick={()=>this.props.onHandleSignUpFacebook()}>FaceBook</button>

              <button type="button" className="btn btn-lg btn-warning btn-block" 
               onClick={()=>this.props.onHandleSignUpLinkedIn()}>LinkedIn</button>

            </div>
          </Modal>
          );
    }

    handleRequestClose() {
      console.log("handleClickOutside");
      if (!this.isSignupRequired()) {
        this.props.onCloseModal();
      }
    }

    render() {
      return (
        <div>
            {this.renderForm()}
        </div>
      );
    }
  }

  SignupForm.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
  }

  export default require('react-click-outside')(SignupForm);