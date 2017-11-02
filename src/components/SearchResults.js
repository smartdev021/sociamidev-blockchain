/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import JobsList from './containers/JobsList';
import EventBriteItemList from './containers/EventBriteItemList';
import UdemyItemList from './containers/UdemyItemList';
import FreelancerProjectItemList from './containers/FreelancerProjectItemList';

import { withCookies, Cookies } from 'react-cookie';

import ConfigMain from '../../configs/main'

import DetailsPopup from './DetailsPopup';

import "../css/searchResults.css"

import {openSearchResultsComplete, bookmarkAdd, bookmarksSet} from '../redux/actions/actions'

class SearchResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDetailsPopupOpen: false,
      detailsPopupItem: {},
    };
  }
  componentWillMount() {
    const savedBookmarks = this.props.cookies.get('bookmarks');
    
    if (savedBookmarks && savedBookmarks.length > 0) {
        if (this.props.bookmarks.length == 0) {
          this.props.setBookmarks(savedBookmarks);
        }
    }

    this.props.openSearchResultsComplete();
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bookmarks.length != this.props.bookmarks.length) {
      const { cookies } = this.props;

      const savedBookmarks = cookies.get('bookmarks');

      //only add bookmarks to cookies if they differ in length or not set yet
      if (!savedBookmarks || savedBookmarks.length != this.props.bookmarks.length) {
          let dateExpire = new Date();
          dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());  
          
          let options = { path: '/', expires: dateExpire};
          
          cookies.set('bookmarks', this.props.bookmarks, options); //will expire in 'lifetimeMinutes' minutes
      }
    }
}

  handleOpenDetailsPopup(item) {
    console.log("handleOpenDetailsPopup");
    console.dir(item);
    let copy = Object.assign({}, this.state, {isDetailsPopupOpen: true, detailsPopupItem: item});
    this.setState(copy)
  }

  handleCloseDetailsPopup(item) {
    console.log("handleCloseDetailsPopup");
    let copy = Object.assign({}, this.state, {isDetailsPopupOpen: false, detailsPopupItem: {}});
    this.setState(copy)
  }

  render() {
    const jobsList = (this.props.currentCategory == "RESULTS_CATEGORY_JOBS") 
    ? <JobsList items={this.props.searchResults.jobs} onAddBookmark={(item) => this.handleOpenDetailsPopup(item)}/> : null;
    
    const eventsList = (this.props.currentCategory == "RESULTS_CATEGORY_EVENTS") 
    ? <EventBriteItemList items={this.props.searchResults.events} onAddBookmark={(item) => this.handleOpenDetailsPopup(item)}/> : null;
    
    const udemyCoursesList = (this.props.currentCategory == "RESULTS_CATEGORY_COURSES") 
    ? <UdemyItemList items={this.props.searchResults.courses} onAddBookmark={(item) => this.props.addBookmark(item)}/> : null;
    
    const freelancerProjectList = (this.props.currentCategory == "RESULTS_CATEGORY_GIGS") 
    ? <FreelancerProjectItemList items={this.props.searchResults.gigs} 
        onAddBookmark={(item) => this.props.addBookmark(item)}/> : null;

    if(this.props.isFetchInProgress) {
      return <div className="search_results_container"><h2>Searching...</h2></div>;
    }
    else {
      return (
        <div className="search_results_container">
          <DetailsPopup modalIsOpen={this.state.isDetailsPopupOpen} onCloseModal={()=>this.handleCloseDetailsPopup()} 
          item={this.state.detailsPopupItem} addBookMark={(item)=>this.props.addBookmark(item)}
      />
          <div className="row">
        <div className="col-lg-12">
            {jobsList}    
            {eventsList}
            {udemyCoursesList}
            {freelancerProjectList}
        </div>
        </div>
      </div>
    );
    }
  }

}

SearchResults.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  searchResults: PropTypes.object.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  cookies: instanceOf(Cookies).isRequired,

  openSearchResultsComplete: PropTypes.func.isRequired,
  addBookmark: PropTypes.func.isRequired,
  setBookmarks: PropTypes.func.isRequired,
}
  
const mapStateToProps = state => ({
  currentCategory: state.currentCategory,
  searchResults : state.searchResults,
  isFetchInProgress : state.isFetchInProgress,
  bookmarks : state.bookmarks.bookmarks,
})

const mapDispatchToProps = dispatch => ({
  openSearchResultsComplete: bindActionCreators(openSearchResultsComplete, dispatch),
  addBookmark: bindActionCreators(bookmarkAdd, dispatch),
  setBookmarks: bindActionCreators(bookmarksSet, dispatch),
})

  
//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(SearchResults)));