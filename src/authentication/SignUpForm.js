import React from 'react';
import Modal from 'react-modal';
import "../css/signUpFormPopup.css"
import ConfigMain from '../../configs/main';

const enhanceWithClickOutside = require('react-click-outside');

class SignupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    renderForm() {
        return (<div>
          <Modal
          className={{
        base: 'modal_base'
      }}
            isOpen={this.props.modalIsOpen}
            onRequestClose={() => this.props.onCloseModal()}
            contentLabel="Login Form"
          >
    
          <div className="wrapper">
        <div className="form-sign-up" >       
          <h2 className="form-sign-u-heading">Sign Up</h2>
          <button type="button" className="btn btn-lg btn-primary btn-block" onClick={this.handleFaceBookSignUp}>FaceBook</button>
          <button type="button" className="btn btn-lg btn-warning btn-block" onClick={this.handleLinkedInSignUp}>LinkedIn</button>
        </div>
      </div>
          </Modal>
        </div>);
      }

      handleClickOutside() {
        () => this.props.onCloseModal();
      }

      handleFormSubmit(event) {
        event.preventDefault();
        return;
      }

      handleLinkedInSignUp() {
        window.location.href = `${ConfigMain.BackendURL}/auth/linkedin`;
      }

      handleFaceBookSignUp() {
        window.location.href = `${ConfigMain.BackendURL}/auth/facebook`;
      }

    render() {
        return (
        <div>
            {this.renderForm()}
        </div>
        );
      }
  }

  module.exports = enhanceWithClickOutside(SignupForm);