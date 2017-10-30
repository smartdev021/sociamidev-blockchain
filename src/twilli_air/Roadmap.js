/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import ConfigMain from '../../configs/main'
import Axios from 'axios'

import { withCookies, Cookies } from 'react-cookie';

import RoadmapsWidget from '../components/RoadmapsWidget';

import {
  selectResultsCategory,
  openSignUpForm,
  roadmapAdd,
  roadmapRemove,
  roadmapsSet,
  setSearchQuery,
} from '../redux/actions/actions'

class RoadmapTwilliAir extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSavingRoadmaps: false,
      roadmaps: [],
    }
  }

  componentWillMount() {

     //TODO: refactor
     if (this.props.searchQuery == "") {
      console.log("Warning: query not set!!!");
      const { cookies } = this.props;
      const savedQuery = cookies.get('searchQuery');

      if (savedQuery && savedQuery != "") {
        console.log("Search from cookies: " + savedQuery);
        this.props.setSearchQuery(savedQuery);
      }
    }
    else {
      this.fetchRoadmapsFromBackend(); 
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery != this.props.searchQuery) {
      if (prevProps.searchQuery == "" && this.props.searchQuery != "") {
        const savedQuery = this.props.cookies.get('searchQuery');
  
        if (savedQuery) {
          if (this.props.searchQuery == savedQuery) {
            this.fetchRoadmapsFromBackend();
          }
        }
      }
    }
  }

  renderSaveRoadmaps() {
    let colStyle = this.props.addedRoadmaps.length > 0 ? {visibility:'initial'} : {visibility:'hidden'};
      let buttonText = this.state.isSavingRoadmaps ? "Saving..." : "Save";
      return (
        <div className="col-lg-12" style={colStyle}>
          <div className="saveRoadmaps">
            <button type="button" className="btn btn-lg btn-outline-inverse" onClick={()=>this.handleSaveRoadmaps()}>{buttonText}</button>
          </div>
        </div>);
  }

  handleSaveRoadmaps() {
    if (!this.props.isAuthorized) {
      this.props.openSignUpForm();
    }
    else {
      console.log("Saving roadmaps to backend...");

      let copy = Object.assign({}, this.state, {isSavingRoadmaps: true});
      this.setState(copy);

      this.saveUserRoadmapsToDatabase();
    }
  }

  renderRoadmaps() {
    return (<div>
      <div className="col-lg-12">
        <h2>Roadmaps</h2>
         <div>
         <RoadmapsWidget roadmaps={this.state.roadmaps} isFetchInProgress={this.props.isFetchInProgress} 
         openSignUpForm={this.props.openSignUpForm} addedRoadmaps={this.props.addedRoadmaps}
         addRoadmap={this.props.addRoadmap}
         removeRoadmap={this.props.removeRoadmap}
         setRoadmaps={this.props.setRoadmaps}
         />
         </div>
         <div className="row">
           {this.renderSaveRoadmaps()}
          </div>
      </div>
      </div>);
  }

  saveUserRoadmapsToDatabase() {
    let url = `${ConfigMain.getBackendURL()}/saveUserRoadmaps?userId=${this.props.userProfile._id}`;

    let parsedRoadmaps = this.parseRoadmapsForURL();

    if (parsedRoadmaps != "") {
      url += '&' + parsedRoadmaps;
    }

    Axios.get(url)
    .then((response) =>this.handlesaveUserRoadmapsToDatabase(response))
    .catch((error) =>this.handlesaveUserRoadmapsToDatabaseError(error));
  }

  handlesaveUserRoadmapsToDatabase(response) {
    console.log("handlesaveUserRoadmapsToDatabase: " + response.status);

    let copy = Object.assign({}, this.state, {isSavingRoadmaps: false});
    this.setState(copy);
  }
    
  handlesaveUserRoadmapsToDatabaseError(error) {
    console.log("handlesaveUserRoadmapsToDatabaseError: " + error);

    let copy = Object.assign({}, this.state, {isSavingRoadmaps: false});
    this.setState(copy);
  }

  fetchRoadmapsFromBackend() {
    if (this.props.searchQuery) {
      Axios.get(`${ConfigMain.getBackendURL()}/findRoadmaps?query=${this.props.searchQuery}`)
      .then((response) =>this.handleRoadmapsFetch(response))
      .catch((error) =>this.handleRoadmapsFetchError(error));
    }
  }

  handleRoadmapsFetch(response) {
    const matchingRoadmaps = response.data.results;

    let copy = Object.assign({}, this.state, {roadmaps: matchingRoadmaps});
    this.setState(copy);
  }
    
  handleRoadmapsFetchError(error) {
    let copy = Object.assign({}, this.state, {roadmaps: []});
    this.setState(copy);
  }

  parseRoadmapsForURL() {
    let result = "";

    let roadmaps = this.props.addedRoadmaps;

    if (roadmaps.length > 0) {
      for (let i = 0; i < roadmaps.length; ++i) {
        result += "roadmaps=" + roadmaps[i];
        if (i < roadmaps.length - 1) {
          result += '&';
        }
      }
    }

    return result;
  }

  
  render() {
  return (<article id="tabs" className="section-wrapper clearfix" data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg7.jpg">
  <div className="mid-vertical-positioning clearfix">
    <div className="col-sm-10 col-md-9 col-lg-10 pull-right">
      {this.renderRoadmaps()}
    </div>
  </div>
</article>);
}
}

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  addRoadmap: bindActionCreators(roadmapAdd, dispatch),
  removeRoadmap: bindActionCreators(roadmapRemove, dispatch),
  setRoadmaps: bindActionCreators(roadmapsSet, dispatch),
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
})

RoadmapTwilliAir.propTypes = {
  isFetchInProgress: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  addedRoadmaps: PropTypes.array.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  userProfile: PropTypes.object.isRequired,

  openSignUpForm: PropTypes.func.isRequired,
  addRoadmap: PropTypes.func.isRequired,
  removeRoadmap: PropTypes.func.isRequired,
  setRoadmaps: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isFetchInProgress: state.isFetchInProgress,
  addedRoadmaps: state.userRoadmaps.roadmaps,
  isAuthorized: state.isAuthorized,
  searchQuery: state.searchQuery,
  userProfile: state.userProfile,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(RoadmapTwilliAir)));