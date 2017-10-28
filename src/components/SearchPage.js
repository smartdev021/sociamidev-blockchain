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

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query : this.props.query,
    };
  }

  HandleStartSearch() {
    this.props.onHandleStartSearch(this.state.query);
  }

  HandleQueryChange(newQuery) {
    let copy = Object.assign({}, this.state, {query: newQuery});
    this.setState(copy);
  }

  componentWillMount() {
    //TODO: refactor
    if (this.props.query == "") {
      console.log("Warning: query not set!!!");
      const { cookies } = this.props;
      const savedQuery = cookies.get('searchQuery');

      if (savedQuery && savedQuery != "") {
        console.log("Search from cookies: " + savedQuery);
        this.HandleQueryChange(savedQuery);
        this.props.onHandleStartSearch(savedQuery);
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
}

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, null)(withCookies(SearchPage)));