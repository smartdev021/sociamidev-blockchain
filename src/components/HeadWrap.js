/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

class HeadWrap extends React.Component 
{
  onStartSearch(event) {
    event.preventDefault();
    this.props.onHandleStartSearch();
  }

  render() {
    const waitingText = (this.props.isFetchInProgress) ? <b>(Wait...)</b> : "";
    return (
        <div id="headerwrap">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>Prepare for the future with what you can learn now</h1>
            <form className="form-inline" action="#" onSubmit={(e) => this.onStartSearch(e)}>
              <div className="form-group">
                <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" 
                placeholder="Key in a job or a skill you are exploring" onChange={(e) => this.props.onHandleChange(e)}/>
              </div>
              <button type="button" className="btn btn-warning btn-lg" 
              onClick={(e) => this.onStartSearch(e)}>Check out the future!{waitingText}</button>
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

export default HeadWrap;