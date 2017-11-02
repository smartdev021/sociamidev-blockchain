import React from 'react';
import Modal from 'react-modal';
import "~/src/css/signUpFormPopup.css"
import ConfigMain from '~/configs/main';

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
      this.state = {modalDefaultStyles: {}};
    }

    componentWillMount() {
      let copy = Object.assign({}, this.state, {modalDefaultStyles: Modal.defaultStyles});
      this.setState(copy);

      Modal.defaultStyles.content.border = "7px solid grey";
      Modal.defaultStyles.content.background = "transparent";
      Modal.defaultStyles.content.overflow = "visible";
      Modal.defaultStyles.content.padding = '0';
      Modal.defaultStyles.content["minWidth"] = '260px';
      Modal.defaultStyles.content["maxWidth"] = '800px';
      Modal.defaultStyles.content["height"] = '70%';
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
      Modal.defaultStyles.content["width"] = '800px';
    }

    componentWillUnMount() {
        Modal.defaultStyles = this.state.modalDefaultStyles;
    }

    trimmedString(original, limit) {
      let trimmed = original.substr(0, limit);
      trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
      
      if (trimmed.length < original.length) {
        trimmed += "...";
      }

      return trimmed;
    }

    renderJobDetails() {
      let title = this.props.item.jobtitle;
      let company = this.props.item.company ? this.props.item.company : '';
      let date = this.props.item.date;

      return (
        <Modal 
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => this.props.onCloseModal()}
        contentLabel={title}>
        <div className="container-fluid default-popup-details">
        <a href='#' className="glyphicon glyphicon-remove" onClick={() => this.props.onCloseModal()}></a>
            <div className="row">
              <div className="col-lg-12">
              <a href={this.props.item.url} target="_blank"><h2 className="popup-default-heading">{title}</h2></a>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><p>{company}</p></a>
              </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><p>{date}</p></a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <button type="button" className="btn btn-sm btn-outline-inverse" 
              onClick={() => this.props.addBookMark(this.props.item)}>Bookmark</button>
              </div>
            </div>
            
              </div>
      </Modal>
      );
    }

    renderEventDetails() {
      let title = this.props.item.name ? this.trimmedString(this.props.item.name, 30) : '';
      let description = this.props.item.description ? this.trimmedString(this.props.item.description, 100) : '';

      return (
        <Modal 
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => this.props.onCloseModal()}
        contentLabel={title}>
        <div className="container-fluid default-popup-details">
        <a href='#' className="glyphicon glyphicon-remove" onClick={() => this.props.onCloseModal()}></a>
            <div className="row">
              <div className="col-lg-12">
              <a href={this.props.item.url} target="_blank"><h2 className="popup-default-heading">{title}</h2></a>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><img src={this.props.item.logoUrl} alt={title}/></a>
              </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><p>{description}</p></a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <button type="button" className="btn btn-sm btn-outline-inverse" 
              onClick={() => this.props.addBookMark(this.props.item)}>Bookmark</button>
              </div>
            </div>
            
              </div>
      </Modal>
      );
    }

    renderForm() {
      if (this.props.item._type == "indeed_job") {
        return this.renderJobDetails();
      }
      else if (this.props.item._type == "eventbrite_event") {
        return this.renderEventDetails();
      }
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