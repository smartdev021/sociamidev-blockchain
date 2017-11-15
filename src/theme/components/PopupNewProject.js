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

class PopupNewProject extends React.Component {
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
      Modal.defaultStyles.content["minHeight"] = '500px';
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
      Modal.defaultStyles.content["width"] = '800px';
    }

    componentWillUnMount() {
        Modal.defaultStyles = this.state.modalDefaultStyles;
    }

    renderModal() {
      return (
        <Modal  isOpen={this.props.modalIsOpen} onRequestClose={() => this.props.onCloseModal()} contentLabel={"Create New Task"}>
          <div className="container-fluid default-popup-details">
            <a href='#' className="glyphicon glyphicon-remove" onClick={() => this.props.onCloseModal()}></a>
            <div className="row">
              <div className="col-lg-12">
                <h2>Create a New</h2>
              </div>
            </div>
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
          {this.renderModal()}
        </div>
      );
    }
  }

  PopupNewProject.propTypes = {
  }

  const mapStateToProps = state => ({
  })

  export default withRouter(enhanceWithClickOutside(connect(mapStateToProps, null)(withCookies(PopupNewProject))));