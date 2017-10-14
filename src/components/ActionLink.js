import React, { Component } from 'react';

class ActionLink extends React.Component {
  handleClick(e){
    e.preventDefault();
    this.props.onClick(e);
  }
  render() {
    return (
      <a href="#" onClick={(e)=> this.handleClick(e)}>
        {this.props.text}</a>
    );
  }

}

export default ActionLink;