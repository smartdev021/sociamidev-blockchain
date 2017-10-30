import React, { Component } from 'react';

class EventBriteItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    //output table row and table data, where table data is taken from props passed inside from parent component
    if (typeof this.props !== "undefined") {
      let itemObject = this.props.item;
      itemObject._type = "eventbrite_event";

      const imgStyle = {width: '200px', height: '100px'};

      //pack all <td> tags and their data into array
      // <td key="1">{this.props.item.description}</td>,
      let tdItems = [<td key="0">{this.props.item.name}</td>,
                      <td key="1">{this.props.item.start}</td>,
                      <td key="2">{this.props.item.end}</td>,
                      <td key="3"><a href={this.props.item.url} target="_blank">Details</a></td>,
                      <td key="4"><img src={this.props.item.logoUrl} style={imgStyle}/></td>,
                      <td key="5"><button type="button" className="btn btn-lg btn-outline-inverse" 
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

export default EventBriteItem;