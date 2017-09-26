/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {query : this.props.query};
  }

  handleValueChange(e) {
    let copy = Object.assign({}, this.state, {query: e.target.value});
    this.setState(copy);

    this.props.onHandleQueryChange(e.target.value);
  }

  render() {
    return (<div>
    <input type="text" placeholder="Key in a job or a skill you are exploring" id="query" onChange={(e) => this.handleValueChange(e)} value={this.state.query}/>
    <button type="button" onClick={this.props.onHandleSearchClicked}>Check out the future!</button>
    </div>);
  }

}

export default SearchHeader;