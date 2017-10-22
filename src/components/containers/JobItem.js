/*
    author: Alexander Zolotov
    This is a component for rendering single job item in form of table row containing table data
*/
import React, { Component } from 'react';

class JobItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    //output table row and table data, where table data is taken from props passed inside from parent component
    if (typeof this.props !== "undefined" && typeof this.props.item !== "undefined") {
      let company = this.props.item.company ? this.props.item.company: "N/A";

      let itemObject = this.props.item;
      itemObject.type = "indeed_job";
      
      //pack all <td> tags and their data into array
      let tdItems = [<td key="0">{this.props.item.jobtitle}</td>,
                      <td key="1">{company}</td>,
                      <td key="2">{this.props.item.country}</td>,
                      <td key="3">{this.props.item.formattedLocation}</td>,
                      <td key="4"><a href={this.props.item.url} target="_blank">Apply</a></td>,
                      <td key="5">{this.props.item.date}</td>,
                      <td key="6">{this.props.item.formattedRelativeTime}</td>,
                      <td key="7"><button type="button" className="btn btn-warning btn-lg" 
                      onClick={() => this.props.onAddBookmark(itemObject)}>Bookmark</button></td>
                    ];
      return (
        //output table row and table data inside it
        <tr key={this.props.index}>
          {tdItems}
        </tr>
      )
    }

    return null;
  }
}

export default JobItem;