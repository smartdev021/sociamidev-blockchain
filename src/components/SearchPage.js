/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';

import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import {
  setSearchQuery,
} from '../redux/actions/actions'

class SearchPage extends React.Component {

  /*constructor(props) {
    super(props);

    this.state = {
      isAutoSearchRequested: false,
    };

  }*/

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
    return (<div className="container search_results" >
      <SearchHeader onHandleQueryChange={(query) => this.HandleQueryChange(query)} 
      onHandleStartSearch={() => this.HandleStartSearch()} query={this.props.query} 
      isSearchInProgress={this.props.isSearchInProgress}/>
        <SearchResults/>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
})

SearchPage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  cookies: instanceOf(Cookies).isRequired,

  setSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(SearchPage)));