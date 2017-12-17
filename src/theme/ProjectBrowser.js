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

import {
  projectsFetch,
} from '~/src/redux/actions/projects'

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

    const currentProjectId = urlParams.get("projectId");

    this.setState({projectId: currentProjectId});

    console.log("currentProjectId: " + currentProjectId);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevstate.projectId: " + prevState.projectId + " this.state.projectId: " + this.state.projectId);
    if (prevState.projectId != this.state.projectId) {
      console.log("Fetching project id: " + this.state.projectId);
      
      const that = this;
      
      const url = `${ConfigMain.getBackendURL()}/projectGet?id=${this.state.projectId}`;
      Axios.get(url)
      .then(function(response) {
        that.setState({project: response.data})
      })
      .catch(function(error) {
        console.log(error);
        that.setState({project: {}})
      });
    }
  }

  renderProject() {
    return  ((this.state.project && this.state.project.name) ?
      <div>
        <div>{this.state.project.name}</div>
        <div>{this.state.project.description}</div>
        <div>{this.state.project.nature}</div>
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
  projectsFetch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  projectsFetch: bindActionCreators(projectsFetch, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(ProjectBrowser)));