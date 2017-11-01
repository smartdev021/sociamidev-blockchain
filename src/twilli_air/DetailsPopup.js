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

class DetailsPopup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    renderPopup() {
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
        <p>Details Popup</p>
        <p>Details Popup</p>
        <p>Details Popup</p>

        <p>Details Popup</p>
        
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
            {this.renderPopup()}
        </div>
        );
      }
  }

  DetailsPopup.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  const mapStateToProps = state => ({
    store: state,
  })

  export default withRouter(enhanceWithClickOutside(connect(mapStateToProps, null)(withCookies(DetailsPopup))));