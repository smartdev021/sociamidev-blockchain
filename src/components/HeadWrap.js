/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setSearchQuery,
} from '../redux/actions/actions'

class HeadWrap extends React.Component 
{
  handleStartSearch(e) {
    e.preventDefault();
    this.props.onHandleStartSearch();
  }

  HandleChange(e) {
    this.props.setSearchQuery(e.target.value);
  }

  render() {
    const waitingText = (this.props.isFetchInProgress) ? <b>(Wait...)</b> : "";
    return (
        <div id="headerwrap">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>Prepare for the future with what you can learn now</h1>
            <form className="form-inline" action="#" onSubmit={(e) => this.handleStartSearch(e)}>
              <div className="form-group">
                <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" 
                placeholder="Key in a job or a skill you are exploring" onChange={(e) => this.HandleChange(e)}/>
              </div>
              <button type="button" className="btn btn-warning btn-lg" 
              onClick={(e) => this.handleStartSearch(e)}>Check out the future!{waitingText}</button>
            </form>					
          </div>
        <div className="col-lg-6">
      <img className="img-responsive" src="https://sociamibucket.s3.amazonaws.com/assets/images/Howwelive_resized.jpg" alt="Howwelive_resized.jpg"/>
    </div>
  </div>
</div>
</div>
    );
  }

}

HeadWrap.propTypes = {
  searchQuery: PropTypes.string.isRequired,

  setSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
})

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(HeadWrap);