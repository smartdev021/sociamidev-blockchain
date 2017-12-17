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

import "~/src/theme/css/progressionTreeBrowser.css"

class ProgressionTreeBrowser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      progressionTreeId: undefined,
      progressionTree: {},
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);

    const currentprogressionTreeId = urlParams.get("id");

    this.setState({progressionTreeId: currentprogressionTreeId});

    console.log("currentprogressionTreeId: " + currentprogressionTreeId);
  }

  progressionTreeFetchSuccess(response) {
    console.log("progressionTree fetch success: ");
    console.dir(response.data);
    this.setState({progressionTree: response.data});
  }

  progressionTreeFetchFailed(error) {
    console.log("progressionTree fetch error: " + error);
    this.setState({progressionTree: {}});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevstate.progressionTreeId: " + prevState.progressionTreeId + " this.state.progressionTreeId: " + this.state.progressionTreeId);
    if (prevState.progressionTreeId != this.state.progressionTreeId) {
      console.log("Fetching progressionTree id: " + this.state.progressionTreeId);
      
      const that = this;
      
      const url = `${ConfigMain.getBackendURL()}/roadmapGet?id=${this.state.progressionTreeId}`;
      Axios.get(url)
      .then((response)=>this.progressionTreeFetchSuccess(response))
      .catch((error)=>this.progressionTreeFetchFailed(error));
    }
  }

  renderprogressionTree() {
    return  ((this.state.progressionTree && this.state.progressionTree.name) ?
    <div className="row">
      <div className="col-lg-12">
        <h1>{this.state.progressionTree.name}</h1>
      </div>
      <div className="col-lg-12">
        <h2>{this.state.progressionTree.description}</h2>
      </div>
      <div className="col-lg-12">
        <h4>{this.state.progressionTree.nature}</h4>
      </div>
    </div>
      :
      <div className="row">
      </div>
    );
  }

  render() {
    return (
      <div id="main-content_1">
        <div className="container-fluid">
          <div id="progressionTree-browser">
            {this.renderprogressionTree()}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(ProgressionTreeBrowser)));