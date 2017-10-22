/*
    author: Alexander Zolotov
    This is a container(parent) component for JobItem components
*/

import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import JobItem from './JobItem';

class JobsList extends React.Component {

  constructor(props) {
    super(props);
  }

  _getTableHeader() {
    return (
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Country</th>
          <th>Location</th>
          <th>Link</th>
          <th>Date</th>
          <th>Posted</th>
          <th></th>
        </tr>
      </thead>);
  }

  render() {
    let listContent = <p>No Jobs Found</p>;
    
    //Parse this.props, and create table of list of jobs. Use JobItem copmonent for single row of the table
    if (typeof this.props !== "undefined" && typeof this.props.items !== "undefined" && this.props.items.length > 0) {
      
      //array of JobItem components
      let jobItems = [];
      
      //create JobItem for each this.props.items element
      for (let i = 0; i < this.props.items.length; ++i) {
        jobItems.push(<JobItem key={i} item={this.props.items[i]} onAddBookmark={(e) => this.props.onAddBookmark(e)}/>);
      }

        listContent = (
        <Table responsive striped bordered condensed hover>
          {this._getTableHeader()}
          <tbody>
            {jobItems}
          </tbody>
        </Table>);
    }

    return (
        <div>
          <h2>Indeed Jobs:</h2>
          {listContent}
        </div>
    );
  }

}

export default JobsList;