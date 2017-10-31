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
import RoadmapWidgetDetails from '../components/RoadmapWidgetDetails'

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
      isViewingDetails: false, currentRoadmapSelected: {},
      isSavingRoadmaps: false,
      roadmaps: [],
    }
  }

toggleAdd(e) {
  let roadmapId = e.target.id;

  if (this.props.addedRoadmaps.indexOf(roadmapId) != -1) {
      this.props.removeRoadmap(roadmapId);
  }
  else {
      this.props.addRoadmap(roadmapId);
  }
}

handleViewDetails(e) {
  if (this.state.roadmaps && this.state.roadmaps.length > 0) {
      for (let i = 0; i < this.state.roadmaps.length; ++i) {
          if (this.state.roadmaps[i]._id == e.target.id) {
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

  console.log("props updated prevProps.addedRoadmaps: ");
  console.dir(prevProps.addedRoadmaps);

  console.log("props updated this.props.addedRoadmaps: ");
  console.dir(this.props.addedRoadmaps);

  const { cookies } = this.props;
  
  const savedRoadmaps = cookies.get('addedRoadmaps');
  
  console.log("componentDidUpdate roadmaps amount has changed!!!");
  
  //only add roadmaps to cookies if they differ in length or not set yet
  let dateExpire = new Date();
  dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());  
  
  let options = { path: '/', expires: dateExpire};
  
  cookies.set('addedRoadmaps', this.props.addedRoadmaps, options); //will expire in 'lifetimeMinutes' minutes
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
    return (
      <span>
        <RoadmapsWidget roadmaps={this.state.roadmaps} isFetchInProgress={this.props.isFetchInProgress} 
        openSignUpForm={this.props.openSignUpForm} addedRoadmaps={this.props.addedRoadmaps}
        addRoadmap={this.props.addRoadmap}
        removeRoadmap={this.props.removeRoadmap}
        setRoadmaps={this.props.setRoadmaps}
        />

      </span>);
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
  
  renderCarouselTabs() {
    return (<ol className="carousel-indicators title-indicators">
       {this.state.roadmaps.map(function(roadmap, i) {
         return<li data-target="#features-carousel" data-slide-to={String(i)} className="" key={i}>{roadmap.name}</li>;
       })}
    </ol>);
  }

  renderRoadmapsControls(roadmapId) {
    const addControlClassName = this.props.addedRoadmaps.indexOf(String(roadmapId)) != -1 ? "	glyphicon glyphicon-ok roadmapControl" 
    : "glyphicon glyphicon-plus roadmapControl";
    return (<span className="roadmapControls">
        <span className="glyphicon glyphicon-eye-open roadmapControl" id={roadmapId} onClick={(e)=> this.handleViewDetails(e)}></span>
        <span className={addControlClassName} id={roadmapId} onClick={(e)=> this.toggleAdd(e)}></span>
    </span>);
}

  renderCarouselItems() {
    let that = this;
    return (
      <div className="carousel-inner">
       {this.state.roadmaps.map(function(roadmap, i) {
         let roadmapControls = that.renderRoadmapsControls(roadmap._id);
         return (<div className={i == 0 ? 'item active roadMap' : 'item roadMap'} key={i}>
         <div className="carousel-text-content">
           <img src="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/transp-image1.png" className="icon" alt="Lorem Ipsum"/>
           <h2 className="title">{roadmap.name}</h2>
           {roadmapControls}
           <p className="roadmapSkillsParagraph">{roadmap.skills.map(function(skill, j) {
                                if (j < 4) {
                                    return<span className="skillTagContainer"><span className="skillTag" key={j}>{skill}</span></span>;
                                }
                                else {
                                    return null;
                                }
                            })}</p>
         </div>
       </div>);
       })}
    </div>
    );
  }

  
  /*render() {
  return (<article id="tabs" className="section-wrapper clearfix" data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg7.jpg">
  <div className="mid-vertical-positioning clearfix">
    <div className="col-sm-10 col-md-9 col-lg-10 pull-right">
      {this.renderRoadmaps()}
    </div>
  </div>
</article>);
}*/
render() {
  if (this.state.isViewingDetails) {
    return(
      <article id="carousel" className="section-wrapper clearfix" 
      data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg7.jpg">
    <div className="col-lg-12"><RoadmapWidgetDetails onViewDefault={()=> this.handleViewDefault()} 
    currentRoadmap = {this.state.currentRoadmapSelected}
    openSignUpForm = {this.props.openSignUpForm}/></div>
    </article>);
  }
  else 
  {
    return (<article id="carousel" className="section-wrapper clearfix" data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg7.jpg">
    <div className="mid-vertical-positioning clearfix">
  
        <div id="features-carousel" className="carousel slide with-title-indicators max-height" data-height-percent="70" data-ride="carousel">
          
         {this.renderCarouselTabs()}
  
            {this.renderCarouselItems()}
          <a className="left carousel-control" href="#features-carousel" data-slide="prev"></a>
          <a className="right carousel-control" href="#features-carousel" data-slide="next"></a>
  
        </div>
  
    </div>
    {this.renderSaveRoadmaps()}
  </article>);
  }
  
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