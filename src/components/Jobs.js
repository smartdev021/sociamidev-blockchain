import React, { Component } from 'react';
import JobsList from './containers/JobsList';

class Jobs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="container">
       <JobsList/>
      </div>
    );
  }

}

export default Jobs;