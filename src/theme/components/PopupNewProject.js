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
      Modal.defaultStyles.content.background = "white";
      Modal.defaultStyles.content.color = "initial";
      Modal.defaultStyles.content.overflow = "visible";
      Modal.defaultStyles.content.padding = '0';
      Modal.defaultStyles.content["minWidth"] = '260px';
      Modal.defaultStyles.content["maxWidth"] = '800px';
      Modal.defaultStyles.content["minHeight"] = '500px';
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
      Modal.defaultStyles.content["width"] = '600px';
    }

    componentWillUnMount() {
        Modal.defaultStyles = this.state.modalDefaultStyles;
    }

    renderModal() {
      return (
        <Modal  isOpen={this.props.modalIsOpen} onRequestClose={() => this.props.onCloseModal()} contentLabel={"Create New Task"}>
          <div className="container-fluid popup-new-project">
            <a href='#' className="glyphicon glyphicon-remove" onClick={() => this.props.onCloseModal()}></a>
            <div className="row">
              <div className="col-lg-12">
                <h5>Add a new Project</h5>
                <div>Do you have a project you are working on that 
                  you would like to share or get help with your friends</div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="create-project-desc-column">
                  <div className="glyphicon glyphicon-bitcoin"></div>
                  <div><b>Use your Tokens</b></div>
                  <p>You can use tokens you have earned to create projects that your heart desires.</p>
                  </div>
                </div>
              <div className="col-lg-6">
                <div className="create-project-desc-column">
                  <div className="glyphicon glyphicon glyphicon-user"></div>
                  <div><b>Your Friends</b></div>
                  <p>These projects contain Milestones that create tasks for your friends to help.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <span>Tip: you can even create your desired final year project here!</span>
                <hr></hr>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h5><span className="badge">1</span>Project Details</h5>
                <div>Tell us more about your project</div>
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