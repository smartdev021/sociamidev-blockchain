import React from 'react';
import Modal from 'react-modal';
import "../css/signUpFormPopup.css"
import LinkedInLogin from '../components/LinkedInLogin';
import FaceBookLoginComponent from '../components/FaceBookLogin';

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
          <FaceBookLoginComponent buttonClassName="btn btn-lg btn-primary btn-block" text="FaceBook" onResponse={(response) => this.handleAuthResponse()}/>
          <LinkedInLogin buttonClassName="btn btn-lg btn-warning btn-block" text="LinkedIn" onResponse={(response) => this.handleAuthResponse()}/> 
        </div>
      </div>
          </Modal>
        </div>);
      }

      handleClickOutside() {
        () => this.props.onCloseModal();
      }

      handleAuthResponse(response) {
        console.log("SignUp auth response: " + response);

        () => this.props.onCloseModal();
      }

      handleFormSubmit(event) {
        event.preventDefault();
        return;
      }

      handleLinkedInButtonClick() {
        () => this.props.onLinkedInSignUpRequested();
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