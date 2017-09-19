import React, { Component } from 'react';
import JobsList from './containers/JobsList';

class Jobs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
       <h3>Found Jobs</h3>
       <JobsList/>
      </div>
    );
  }

}

export default Jobs;