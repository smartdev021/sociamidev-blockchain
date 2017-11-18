import React from 'react';
import Modal from 'react-modal';
import "~/src/css/signUpFormPopup.css"

class SignupForm extends React.Component {
    constructor(props) {
      super(props);

      this.modalDefaultStyles = {};
    }

    componentWillMount() {
      console.log("SignUpForm::componentWillMount");
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
    }

    componentWillUnmount() {
      console.log("SignUpForm::componentWillUnmount");
      Modal.defaultStyles = this.modalDefaultStyles;
    }

    renderForm() {
      console.log("SignUpForm::renderForm");
        return (
          <Modal isOpen={this.props.modalIsOpen} onRequestClose={() => this.props.onCloseModal()} contentLabel="Login Form">
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

    handleClickOutside() {
      () => this.props.onCloseModal();
    }

    render() {
      return (
        <div>
            {this.renderForm()}
        </div>
      );
    }
  }

  export default require('react-click-outside')(SignupForm);