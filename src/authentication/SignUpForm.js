import React from 'react';
import Modal from 'react-modal';
import "../css/signUpFormPopup.css"
import ConfigMain from '../../configs/main';

import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

const enhanceWithClickOutside = require('react-click-outside');

const BackendURL = ConfigMain.getBackendURL();

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
          <button type="button" className="btn btn-lg btn-primary btn-block" 
          onClick={()=>this.props.onHandleSignUpFacebook()}>FaceBook</button>
          <button type="button" className="btn btn-lg btn-warning btn-block" 
          onClick={()=>this.props.onHandleSignUpLinkedIn()}>LinkedIn</button>
        </div>
      </div>
          </Modal>
        </div>);
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

  SignupForm.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  const mapStateToProps = state => ({
    store: state,
  })

  export default withRouter(enhanceWithClickOutside(connect(mapStateToProps, null)(withCookies(SignupForm))));