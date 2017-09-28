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
    const waitingText = (this.props.isSearchInProgress) ? <b>(Wait...)</b> : "";
    return (<div>
    <form className="form-inline" action="#" onSubmit={this.props.onHandleSearchClicked}>
    <div className="form-group">
      <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" 
          placeholder="Key in a job or a skill you are exploring" 
              value={this.state.query} onChange={(e) => this.handleValueChange(e)}/>
    </div>
    <button type="button" className="btn btn-warning btn-lg" onClick={this.props.onHandleSearchClicked}>Check out the future!{waitingText}</button>
  </form>					
    </div>);

    this.props.onHandleSearchClicked
  }

  

}

export default SearchHeader;