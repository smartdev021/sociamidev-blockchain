import React, { Component } from 'react';

class EventBrightItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    //output table row and table data, where table data is taken from props passed inside from parent component
    if (typeof this.props !== "undefined") {
      //pack all <td> tags and their data into array
      // <td key="1">{this.props.item.description}</td>,
      console.log(this.props);
      var tdItems = [<td key="0">{this.props.item.name}</td>,
                      <td key="1">{this.props.item.start}</td>,
                      <td key="2">{this.props.item.end}</td>,
                      <td key="3">{this.props.item.status}</td>,
                      <td key="4"><a href={this.props.item.url} target="_blank">Details</a></td>,
                      <td key="5"><img src={this.props.item.logoUrl}/></td>
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

export default EventBrightItem;