import React, { Component } from 'react';

import "../../css/freelancerItem.css";

class FreelancerProjectItemList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let dateHR = new Date(this.props.item.submitdate * 1000).toUTCString();

    let itemObject = this.props.item;
    itemObject.type = "freelancer_gig";

    let tdStatusClass = "status_td_default";

    if (this.props.item.status == "active") {
      tdStatusClass = "status_td_active";
    }
    else if (this.props.item.status == "closed") {
      tdStatusClass = "status_td_closed";
    }

    if (typeof this.props !== "undefined") {

      let tdItems = [<td key="0">{this.props.item.title}</td>,
                     <td key="1">{this.props.item.description}</td>,
                     <td key="2" className={tdStatusClass}>{this.props.item.status}</td>,
                     <td key="3"><a href={this.props.item.url} target="_blank">Details</a></td>,
                     <td key="4">{dateHR}</td>,
                     <td key="5"><button type="button" className="btn btn-warning btn-lg" 
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

export default FreelancerProjectItemList;