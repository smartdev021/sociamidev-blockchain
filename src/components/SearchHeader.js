/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {country: this.props.country, query : this.props.query};
  }

  /*
    if input value is changed for query, or country - set the new state
  */
  handleChange(event) {
    if (event.target.id === "country_select") {
      var newState = Object.assign({}, this.state, {country: event.target.value});
      this.setState(newState);
      console.log("CHanging country");
    }

    if (event.target.id === "job_title") {
      var newState = Object.assign({}, this.state, {query: event.target.value});
      this.setState(newState);
      console.log("job_title");
    }
  }

  /*
    if component has updated(state has changed) -> notify parent component, and pass the new data
  */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.country != prevState.country || this.state.query != prevState.query) {

      this.props.onHandleQueryChange(this.state.query);
      this.props.onHandleCountryChange(this.state.country);
    }
  }

  /*
    Returns tags for rendering a search form
  */

  render() {
    let countriesSelectOptions = [];
    for (var country in this.props.countries) {
      countriesSelectOptions.push(<option value={this.props.countries[country]} key={this.props.countries[country]}>{country}</option>);
    }

    return (
      <div>
        <input type="text" placeholder="job name" id="job_title" onChange={this.handleChange} value={this.state.query}/>
        <select name="country" value={this.state.country} onChange={this.handleChange} id="country_select">{countriesSelectOptions}</select>
      </div>
    );
  }

}

export default SearchHeader;