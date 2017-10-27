/*
    author: Alexander Zolotov
    This is a container(parent) component for JobItem components
*/

import React, { Component } from 'react';
import EventBriteItem from './EventBriteItem';
import {Table} from 'react-bootstrap';

class EventBriteItemList extends React.Component {

  constructor(props) {
    super(props);
  }

  _getTableHeader() {
    /*<th>Description</th>*/
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
          <th>Link</th>
          <th>Logo</th>
          <th></th>
        </tr>
      </thead>);
  }

  render() {

    let listContent = <p>No Events Found</p>;
    
    //Parse this.props, and create table of list of jobs. Use JobItem copmonent for single row of the table
    if (typeof this.props !== "undefined" && typeof this.props.items !== "undefined" && this.props.items.length > 0) {
      
      //array of JobItem components
      let eventBriteItems = [];
      
      //create JobItem for each this.props.items element
      for (let i = 0; i < this.props.items.length; ++i) {
        eventBriteItems.push(<EventBriteItem key={i} item={this.props.items[i]} onAddBookmark={(e) => this.props.onAddBookmark(e)}/>);
      }

        listContent = (
        <Table responsive striped bordered condensed hover>
          {this._getTableHeader()}
          <tbody>
            {eventBriteItems}
          </tbody>
        </Table>);
    }

    return (
        <div>
          <h2>EventBrite List:</h2>
          {listContent}
        </div>
    );
  }

}

export default EventBriteItemList;