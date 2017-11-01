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

class DetailsPopup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    trimmedString(original, limit) {
      let trimmed = original.substr(0, limit);
      trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
      return trimmed;
    }

    renderForm() {

      let title = this.props.item.name ? this.trimmedString(this.props.item.name, 30) : '';
      let description = this.props.item.description ? this.trimmedString(this.props.item.description, 100) : '';

        return (
          <Modal className={{ base: 'modal_base' }}
            isOpen={this.props.modalIsOpen}
            onRequestClose={() => this.props.onCloseModal()}
            contentLabel="Login Form">
            <div className="wrapper">
              <div className="default-popup-details">
                <h2 className="popup-default-heading">{title}</h2>
                  <img src={this.props.item.logoUrl} className="item-thumbnail" alt={title}/>
                  <p>{description}</p>
                  <p><button type="button" className="btn btn-lg btn-outline-inverse" 
                      onClick={() => this.props.addBookMark(this.props.item)}>Bookmark</button></p>
                  <p><a href={this.props.item.url} className="btn btn-lg btn-outline-inverse" target="_blank">Details</a></p>
                  <p><button type="button" className="btn btn-lg btn-outline-inverse" 
                      onClick={() => this.props.onCloseModal()}>Close</button></p>
              </div>
            </div>
          </Modal>);
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

  DetailsPopup.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  const mapStateToProps = state => ({
    store: state,
  })

  export default withRouter(enhanceWithClickOutside(connect(mapStateToProps, null)(withCookies(DetailsPopup))));