import React, { Component } from 'react';

import ActionLink from '../ActionLink'

class EventBriteItem extends React.Component {

  constructor(props) {
    super(props);
  }

  trimmedString(original, limit) {
    let trimmed = original.substr(0, limit);
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")));
    return trimmed;
  }

  render() {
    //output table row and table data, where table data is taken from props passed inside from parent component
    if (typeof this.props !== "undefined") {
      let itemObject = this.props.item;
      itemObject._type = "eventbrite_event";


      /*
      <img src={this.props.item.logoUrl} style={imgStyle} 
            className="lazy item-thumbnail" alt="Lorem Ipsum"/>*/
      
      //re-trim if we are in the middle of a word
      let title = this.trimmedString(this.props.item.name, 16);
      let description = this.trimmedString(this.props.item.description, 60);
/*<p><button type="button" className="btn btn-lg btn-outline-inverse" 
                      onClick={() => this.props.onAddBookmark(itemObject)}>Bookmark</button></p>*/

      return (
        

        
        <article className="feature-col col-md-4">
        <ActionLink href={this.props.item.url} className="thumbnail linked" onClick={()=> this.props.onAddBookmark(this.props.item)}>
          <div className="image-container">
            <img src={this.props.item.logoUrl}
            className="item-thumbnail" alt={title}/>
          </div>
          <div className="caption">
            <h5>{title}</h5>
            <p>{description}</p>
            <p>{this.props.item.start}</p>
          </div>
        </ActionLink>
      </article>
      )
    }

    return null;
  }
}

export default EventBriteItem;