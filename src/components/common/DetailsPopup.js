import React from 'react';
import Modal from 'react-modal';
import "~/src/css/signUpFormPopup.css"

import StringUtils from "~/src/utils/StringUtils"

class DetailsPopup extends React.Component {
    constructor(props) {
      super(props);
      
      this.modalDefaultStyles = {};
    }

    componentWillMount() {
      console.log("DetailsPopup::componentWillMount");
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.border = "7px solid grey";
      Modal.defaultStyles.content.background = "transparent";
      Modal.defaultStyles.content.overflow = "visible";
      Modal.defaultStyles.content.padding = '0';
      Modal.defaultStyles.content["minWidth"] = '260px';
      Modal.defaultStyles.content["maxWidth"] = '800px';
      Modal.defaultStyles.content["minHeight"] = '500px';
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
      Modal.defaultStyles.content["width"] = '800px';
    }

    componentWillUnmount() {
      console.log("DetailsPopup::componentWillUnmount");
      Modal.defaultStyles = this.modalDefaultStyles;
    }

    renderJobDetails() {
      let title = this.props.item.jobtitle;
      let company = this.props.item.company ? this.props.item.company : '';
      let date = this.props.item.date;

      return (
        <Modal 
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => this.props.onCloseModal()}
        contentLabel={title}>
        <div className="container-fluid default-popup-details">
        <a href='#' className="glyphicon glyphicon-remove" onClick={() => this.props.onCloseModal()}></a>
            <div className="row">
              <div className="col-lg-12">
              <a href={this.props.item.url} target="_blank"><h2 className="popup-default-heading">{title}</h2></a>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><p>{company}</p></a>
              </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><p>{date}</p></a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <button type="button" className="btn btn-sm btn-outline-inverse" 
              onClick={() => this.props.addBookMark(this.props.item)}>Bookmark</button>
              </div>
            </div>
            
              </div>
      </Modal>
      );
    }

    renderEventDetails() {
      let title = this.props.item.name ? StringUtils.trim(this.props.item.name, 40) : '';
      let description = this.props.item.description ? StringUtils.trim(this.props.item.description, 100) : '';

      return (
        <Modal 
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => this.props.onCloseModal()}
        contentLabel={title}>
        <div className="container-fluid default-popup-details">
        <a href='#' className="glyphicon glyphicon-remove" onClick={() => this.props.onCloseModal()}></a>
            <div className="row">
              <div className="col-lg-12">
              <a href={this.props.item.url} target="_blank"><h2 className="popup-default-heading">{title}</h2></a>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><img src={this.props.item.logoUrl} alt={title}/></a>
              </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <a href={this.props.item.url} target="_blank"><p>{description}</p></a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
              <button type="button" className="btn btn-sm btn-outline-inverse" 
              onClick={() => this.props.addBookMark(this.props.item)}>Bookmark</button>
              </div>
            </div>
            
              </div>
      </Modal>
      );
    }

    renderForm() {
      if (this.props.item._type == "indeed_job") {
        return this.renderJobDetails();
      }
      else if (this.props.item._type == "eventbrite_event") {
        return this.renderEventDetails();
      }
  }

      handleClickOutside() {
        () => this.props.onCloseModal();
      }

    render() {
        return (
        <div>
            {this.renderForm()}
        </div>
        );
      }
  }

  export default require('react-click-outside')(DetailsPopup);