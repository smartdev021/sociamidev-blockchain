/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';

import PopupNewProject from '~/src/theme/components/PopupNewProject';

import "~/src/css/projectManagement.css"

class ProjectManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      tasksAmount: 0,
    }
  }

  componentWillMount() {
    if (this.state.tasksAmount == 0) {
      this.openModal();
    }
  }

  closeModal() {
    let copy = Object.assign({}, this.state, {modalIsOpen: false});
    this.setState(copy);
  }

  openModal() {
    let copy = Object.assign({}, this.state, {modalIsOpen: true});
    this.setState(copy);
  }

  renderHeader() {
    return (
      <div className="container-fluid projectManagementPage">
        <div className="row">
          <div className="col-lg-12">
            <button type="button" className="btn btn-lg btn-outline-inverse pull-right" 
              onClick={()=>this.openModal()}>Add a New Project</button>
          </div>
        </div>
     </div>);
  }

  render() {
    return (
      <div>
        {this.state.modalIsOpen ? <PopupNewProject modalIsOpen={this.state.modalIsOpen} onCloseModal={()=>this.closeModal()}/> : null}
        {this.renderHeader()}
      </div>);
  }

}

ProjectManager.propTypes = {
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(ProjectManager)));