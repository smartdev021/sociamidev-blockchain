/*
    author: Alexander Zolotov
    This is a container(parent) component for JobItem components
*/

import React, { Component } from 'react';
import EventBrightItem from './EventBrightItem';
import "../../css/eventBrightEventsList.css";

class EventBrightItemList extends React.Component {

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
        </tr>
      </thead>);
  }

  render() {

    let listContent = <p>No Events Found</p>;
    
    //Parse this.props, and create table of list of jobs. Use JobItem copmonent for single row of the table
    if (typeof this.props !== "undefined" && typeof this.props.items !== "undefined" && this.props.items.length > 0) {
      
      //array of JobItem components
      let eventBrightItems = [];
      
      //create JobItem for each this.props.items element
      for (let i = 0; i < this.props.items.length; ++i) {
        eventBrightItems.push(<EventBrightItem key={i} item={this.props.items[i]}/>);
      }

        listContent = (
        <table id="job_list_table">
          {this._getTableHeader()}
          <tbody>
            {eventBrightItems}
          </tbody>
        </table>);
    }

    return (
        <div>
          <h2>Event Bright List:</h2>
          {listContent}
        </div>
    );
  }

}

export default EventBrightItemList;