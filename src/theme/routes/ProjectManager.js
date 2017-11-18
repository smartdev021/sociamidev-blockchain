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

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/css/projectManagement.css"

class ProjectManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      tasksAmount: 0,
      projects: [],
      selectedProjectIndex: 0,
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
    let copy = Object.assign({}, this.state, {modalIsOpen: true, selectedProjectIndex: -1});
    this.setState(copy);
  }

  openModalWithProject(index) {
    let copy = Object.assign({}, this.state, {modalIsOpen: true, selectedProjectIndex: index});
    this.setState(copy);
  }

  renderProject(task) {
    return (
      <h5>{project.name}</h5>
    );
  }

  renderProjects(projects) {
    if (!projects) {
      return null;
    }

    let that = this;

    return (
      <section className="feature-columns"> 
        <div className="row">
          {
            projects.map(function(project, i) {
              return (
                <article className="jobTile feature-col col-md-4" key={i}>
                  <ActionLink href='#' className="thumbnail linked" onClick={()=> that.openModalWithProject(i)}>
                    <div className="caption">
                      <p>{project.name}</p>
                    </div>
                  </ActionLink>
                </article>
              );
            })
          }
        </div>
      </section>
    );
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
    let {projects} = this.state;
    let selectedProject = (this.state.projects.length > 0 && this.state.selectedProjectIndex >= 0) 
    ? this.state.projects[this.state.selectedProjectIndex] : undefined;
    return (
      <div>
        {this.state.modalIsOpen ? 
          <PopupNewProject modalIsOpen={this.state.modalIsOpen} 
            onCloseModal={()=>this.closeModal()} project={selectedProject}/> : null
        }
        {this.renderHeader()}
        {this.renderProjects(projects)}
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