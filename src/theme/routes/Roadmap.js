/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import ConfigMain from '~/configs/main'
import Axios from 'axios'
import { withCookies, Cookies } from 'react-cookie';

import RoadmapsWidget from '~/src/theme/components/RoadmapsWidget';
import RoadmapWidgetDetails from '~/src/theme/components/RoadmapWidgetDetails'

import {
  openSignUpForm,
  roadmapAdd,
  roadmapRemove,
  roadmapsSet,
  setSearchQuery,
  setExactLocation,
} from '~/src/redux/actions/actions'

class Roadmap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isViewingDetails: false, currentRoadmapSelected: {},
      isSavingRoadmaps: false,
      roadmaps: [],
    }
  }

  saveCookies() {
    const { cookies } = this.props;
    
    const savedRoadmaps = cookies.get('addedRoadmaps');
    
    //only add roadmaps to cookies if they differ in length or not set yet
    let dateExpire = new Date();
    dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());  
    
    let options = { path: '/', expires: dateExpire};
    
    cookies.set('addedRoadmaps', this.props.addedRoadmaps, options); //will expire in 'lifetimeMinutes' minutes
  }

  handleViewDetails(roadmapId) {
    if (this.state.roadmaps && this.state.roadmaps.length > 0) {
        for (let i = 0; i < this.state.roadmaps.length; ++i) {
            if (this.state.roadmaps[i]._id == roadmapId) {
                let copy = Object.assign({}, this.state, {isViewingDetails: true, currentRoadmapSelected: this.state.roadmaps[i]});
                this.setState(copy);
                break;
            }
        }
    }
  }
  
  handleViewDefault() {
    let copy = Object.assign({}, this.state, {isViewingDetails: false});
    this.setState(copy);
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

    if (this.props.addedRoadmaps.length == 0) {
      const savedRoadmaps = this.props.cookies.get('addedRoadmaps');
      
      if (savedRoadmaps && savedRoadmaps.length > 0) {
           this.props.setRoadmaps(savedRoadmaps);
      }
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

    if (this.props.isFetchInProgress != prevProps.isFetchInProgress) {
      if (this.props.isFetchInProgress) {
          this.handleViewDefault();
      }
    }

    this.saveCookies();
  }

  renderSaveButton() {
    let colStyle = this.props.addedRoadmaps.length > 0 ? {visibility:'initial'} : {visibility:'hidden'};
    let buttonText = this.state.isSavingRoadmaps ? "Saving..." : "Save";
    return (
      <div className="col-lg-12" style={colStyle}>
        <div className="saveRoadmaps">
          <button type="button" className="btn btn-lg btn-outline-inverse" onClick={()=>this.handleSaveRoadmaps()}>{buttonText}</button>
        </div>
      </div>
    );
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
    if (this.state.isViewingDetails) {
      return (
        <article id="carousel" className="section-wrapper clearfix" 
          data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg7.jpg">
            <div className="col-lg-12"><RoadmapWidgetDetails onViewDefault={()=> this.handleViewDefault()} 
              currentRoadmap = {this.state.currentRoadmapSelected}
              isAuthorized = {this.props.isAuthorized}
              openSignUpForm = {this.props.openSignUpForm} 
              setExactLocation={this.props.setExactLocation}
              cookies={this.props.cookies}/>
            </div>
        </article>
      );
    }
    else 
    {
      return (
      <article id="carousel" className="section-wrapper clearfix" 
        data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg7.jpg">
          <div className="mid-vertical-positioning clearfix">
            <RoadmapsWidget roadmaps={this.state.roadmaps} addedRoadmaps={this.props.addedRoadmaps}
              addRoadmap={this.props.addRoadmap} removeRoadmap={this.props.removeRoadmap}
              onHandleViewDetails={(roadmapId)=>this.handleViewDetails(roadmapId)}/>
          </div>
          {this.renderSaveButton()}
      </article>
      );
    }
    
  }
}

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  addRoadmap: bindActionCreators(roadmapAdd, dispatch),
  removeRoadmap: bindActionCreators(roadmapRemove, dispatch),
  setRoadmaps: bindActionCreators(roadmapsSet, dispatch),
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
  setExactLocation: bindActionCreators(setExactLocation, dispatch),
})

Roadmap.propTypes = {
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
  setExactLocation: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isFetchInProgress: state.isFetchInProgress,
  addedRoadmaps: state.userRoadmaps.roadmaps,
  isAuthorized: state.isAuthorized,
  searchQuery: state.searchQuery,
  userProfile: state.userProfile,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(Roadmap)));