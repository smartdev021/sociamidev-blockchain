/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';

import Axios from 'axios'

import ConfigMain from '~/configs/main'


import "~/src/theme/css/common.css"
import "~/src/theme/css/projectManager.css"

class ProjectBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projectId: undefined,
      project: {},
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);

    const currentProjectId = urlParams.get("id");

    this.setState({projectId: currentProjectId});

    console.log("currentProjectId: " + currentProjectId);
  }

  projectFetchSuccess(response) {
    console.log("Project fetch success: ");
    console.dir(response.data);
    this.setState({project: response.data});
  }

  projectFetchFailed(error) {
    console.log("Project fetch error: " + error);
    this.setState({project: {}});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevstate.projectId: " + prevState.projectId + " this.state.projectId: " + this.state.projectId);
    if (prevState.projectId != this.state.projectId) {
      console.log("Fetching project id: " + this.state.projectId);
      
      const that = this;
      
      const url = `${ConfigMain.getBackendURL()}/projectGet?id=${this.state.projectId}`;
      Axios.get(url)
      .then((response)=>this.projectFetchSuccess(response))
      .catch((error)=>this.projectFetchFailed(error));
    }
  }

  renderProject() {
    return  ((this.state.project && this.state.project.name) ?
      <div>
        <h1>{this.state.project.name}</h1>
        <h2>{this.state.project.description}</h2>
        <h4>{this.state.project.nature}</h4>
      </div>
      :
      <div>
      </div>
    );
  }

  render() {
    return (
      <div id="main-content_1">
        <div id="project-browser">
          {
           this.renderProject()
          }
        </div>
      </div>
    );
  }
}

ProjectBrowser.propTypes = {
  projects: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(ProjectBrowser)));