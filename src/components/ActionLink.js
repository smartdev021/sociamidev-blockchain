import React, { Component } from 'react';

class ActionLink extends React.Component {
  handleClick(e){
    e.preventDefault();
    this.props.onClick(e);
  }
  render() {
    const style = this.props.className ? this.props.className : "";
    const tagId = this.props.id ? this.props.id : "";

    return (
      <a className={style} id={tagId} href="#" onClick={(e)=> this.handleClick(e)}>
        {this.props.children}</a>
    );
  }

}

export default ActionLink;