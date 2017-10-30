/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

//import SearchHeader from './SearchHeader';
import SearchResults from '../components/SearchResults';
import SearchHeader from '../components/SearchHeader';
import SearchPageNavigation from './SearchPageNavigation';

import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import {
  setSearchQuery,
} from '../redux/actions/actions'

class SearchPageTwilliAir extends React.Component {
  HandleStartSearch() {
    this.props.onHandleStartSearch();
  }

  HandleQueryChange(newQuery) {
    this.props.setSearchQuery(newQuery);
  }

  componentWillMount() {
    //TODO: refactor
    if (this.props.searchQuery == "") {
      console.log("Warning: query not set!!!");
      const { cookies } = this.props;
      const savedQuery = cookies.get('searchQuery');

      if (savedQuery && savedQuery != "") {
        console.log("Search from cookies: " + savedQuery);
        this.HandleQueryChange(savedQuery);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery != this.props.searchQuery) {
      if (prevProps.searchQuery == "" && this.props.searchQuery != "") {
        const savedQuery = this.props.cookies.get('searchQuery');
  
        if (savedQuery) {
          if (this.props.searchQuery == savedQuery) {
            this.HandleStartSearch();
          }
        }
      }
    }
  }

  render() {
      
    return (<article id="tabs" className="section-wrapper clearfix" data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg7.jpg">
    <div className="mid-vertical-positioning clearfix">
      <div className="col-sm-10 col-md-9 col-lg-10 pull-right">
      <span className="searchHeaderTextAndBookmarks"><h1 className="section-title">Results
        </h1>
        </span>
          <div className="tabpanel styled-tabs uniform-height" role="tabpanel">

            <SearchPageNavigation/>
            <h4 className="glyphicon glyphicon-book text-center glyphicon-big pull-right glyphicon-text">Bookmarks({this.props.numBookmarks})
        </h4>
            <SearchHeader onHandleQueryChange={(query) => this.HandleQueryChange(query)} 
      onHandleStartSearch={() => this.HandleStartSearch()} isAuthorized={this.props.isAuthorized} 
      isSearchInProgress={this.props.isSearchInProgress}/>
            <div className="tab-content">

            <SearchResults/>

            </div>
          </div>

      </div>
    </div>
  </article>);

    /*return (<div className="container search_results" >
      <SearchHeader onHandleQueryChange={(query) => this.HandleQueryChange(query)} 
      onHandleStartSearch={() => this.HandleStartSearch()} isAuthorized={this.props.isAuthorized} 
      isSearchInProgress={this.props.isSearchInProgress}/>
        <SearchResults/>
      </div>
    );*/
  }

}


const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  isAuthorized: state.isAuthorized,
  currentCategory: state.currentCategory,
  numBookmarks: state.bookmarks.amount,
})

SearchPageTwilliAir.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  numBookmarks: PropTypes.number.isRequired,

  setSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(SearchPageTwilliAir)));