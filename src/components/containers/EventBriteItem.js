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

      /*
      <img src={this.props.item.logoUrl} style={imgStyle} 
            className="lazy item-thumbnail" alt="Lorem Ipsum"/>*/

      //pack all <td> tags and their data into array
      // <td key="1">{this.props.item.description}</td>,
      let description = this.props.item.description; //replace with your string.
      let maxLength = 60 // maximum number of characters to extract
      
      //trim the string to the maximum length
      description = description.substr(0, maxLength);
      
      //re-trim if we are in the middle of a word
      description = description.substr(0, Math.min(description.length, description.lastIndexOf(" ")));


      return (
        

        <article className="feature-col col-md-4">
        <a href={this.props.item.url} target="_blank" className="thumbnail linked">
          <div className="image-container">
            <img src={this.props.item.logoUrl} style={imgStyle} 
            className="" alt={this.props.item.name}/>
          </div>
          <div className="caption">
            <h5>{this.props.item.name}</h5>
            <p>{this.props.item.start}</p>
            <p>{description}</p>
          </div>
        </a>
        <p><button type="button" className="btn btn-lg btn-outline-inverse" 
                      onClick={() => this.props.onAddBookmark(itemObject)}>Bookmark</button></p>
      </article>
      )
    }

    return null;
  }
}

export default EventBriteItem;