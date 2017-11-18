/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';

const Hash = require('object-hash');

import PopupNewProject from '~/src/theme/components/PopupNewProject';

import ActionLink from '~/src/components/common/ActionLink'

import ConfigMain from '~/configs/main'

import "~/src/css/projectManagement.css"

class ProjectManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      projectsAmount: 0,
      projects: [],
      selectedProjectIndex: 0,
    }
  }

  tryReadProjectsFromCookies() {
    const { cookies } = this.props;
    
    const savedProjects = cookies.get('projects');

    console.log("tryReadProjectsFromCookies: savedProjects: ");
    console.dir(savedProjects);

    if (savedProjects) {
      let copy = Object.assign({}, this.state, {modalIsOpen: false, projects: savedProjects});
      this.setState(copy);
      return true;
    }

    return false;
  }

  tryReadProjects() {
    return this.tryReadProjectsFromCookies();
  }

  saveProjects(projects) {
    this.saveProjectsToCookies(projects);
  }

  saveProjectsToCookies(projects) {
    const { cookies } = this.props;

    let dateExpire = new Date();
    dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());  
    
    let options = { path: '/', expires: dateExpire};

    console.log("saveProjectsToCookies: projects: ");
    console.dir(projects);
    
    cookies.set('projects', projects, options); //will expire in 'lifetimeMinutes' minutes

    const savedProjects = cookies.get('projects');
    console.log("saveProjectsToCookies: savedProjects: ");
    console.dir(savedProjects);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("ProjectManager::componentDidUpdate");
    console.dir(this.state);
  }

  componentWillMount() {
    if (!this.tryReadProjects()) {
      this.openModal();
    }
  }

  closeModal(project) {
    console.dir(project);
    if (project) {

      let copyProjects = this.state.projects.slice(0);

      if (!project.id) {
        console.log("Adding new project...");
        project.id = Hash(project);

        copyProjects.push(project);
      }
      else {
        const idToFind = project.id;
        let findByID = function(curProject) {
          return curProject.id == idToFind;
        }

        const foundIndex = this.state.projects.findIndex(findByID);

        if (foundIndex >= 0) {
          console.log("Altering existing project...");
          copyProjects[foundIndex] = project;
        }
      }

      let copy = Object.assign({}, this.state, {modalIsOpen: false, projects: copyProjects});
      this.setState(copy);

      this.saveProjects(copyProjects);
    }
    else {
      let copy = Object.assign({}, this.state, {modalIsOpen: false});
      this.setState(copy);
    }
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

  renderProjects() {
    if (!this.state.projects || this.state.projects.length == 0) {
      return null;
    }

    console.log("renderProjects this.state.projects: ");
    console.dir(this.state.projects);

    let that = this;

    return (
      <section className="feature-columns"> 
        <div className="row">
          {
            this.state.projects.map(function(project, i) {
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
    let that = this;
    let selectedProject = (this.state.projects.length > 0 && this.state.selectedProjectIndex >= 0) 
    ? this.state.projects[this.state.selectedProjectIndex] : undefined;

    console.log("selectedProject: ");
    console.dir(selectedProject);
    return (
      <div>
        {this.state.modalIsOpen ? 
          <PopupNewProject modalIsOpen={this.state.modalIsOpen} 
            onCloseModal={(project)=>this.closeModal(project)} project={selectedProject}/> : null
        }
        {this.renderHeader()}
        {that.renderProjects()}
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