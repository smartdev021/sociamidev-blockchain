/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setSearchQuery,
} from '~/src/redux/actions/actions'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  handleStartSearch(e) {
    e.preventDefault();
    this.props.onHandleStartSearch();
  }

  HandleChange(e) {
    this.props.setSearchQuery(e.target.value);
  }

  render() {
//<img src="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/logo.png"
const waitingText = (this.props.isFetchInProgress) ? <b>(Wait...)</b> : "";

const TextInput = this.props.isFetchInProgress ? <h6>Searching...</h6> 
: (<input type="text" className="text-field form-control validate-field required" data-validation-type="string" 
    id="form-name" name="query" autoComplete="off"
      placeholder="Key in a job or a skill you are exploring" onChange={(e) => this.HandleChange(e)} autoFocus/>);

    return (
            <article id="intro" className="section-wrapper clearfix" data-custom-background-img="http://sociamibucket.s3.amazonaws.com/twilli_air/assets/images/other_images/bg5.jpg">
              <div className="clearfix" data-wow-delay="0.3s">
                <div className="col-sm-10 col-md-9 col-lg-10 pull-right">
                    <section className="feature-text">
                      <h1>What should I learn next</h1>
                      <p>Soqqle helps you develop your learning map, connect with friends and earn by sharing your knowledge and experience</p>
                      <form className="form-inline" action="#" onSubmit={(e) => this.handleStartSearch(e)}>
                        <div className="form-group">
                          {TextInput}
                        </div>
                      </form>
                    </section>
                </div>
              </div>
            </article>
    );
  }

}

HomePage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  isFetchInProgress: PropTypes.bool.isRequired,

  setSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setSearchQuery: bindActionCreators(setSearchQuery, dispatch),
})

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  isFetchInProgress: state.isFetchInProgress,
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);