import React from 'react';
import Modal from 'react-modal';
import "~/src/css/PopupLatestTask.css"

class PopupAcceptProgressionTree extends React.Component {
    constructor(props) {
      super(props);

      this.modalDefaultStyles = {};
    }
    render() {
        return (
        <div className="container-fluid popup-new-project">
          <div className="row">
            <div className="col-lg-12">
              <p>Progression Tree Accept</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p>Do you really want to accept this Progression Tree?</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button type="button" className="btn btn-lg btn-outline-inverse" 
                    onClick={() => this.props.onConfirmationPopupClose(true, this.props.treeId)}>Yes</button>
              <button type="button" className="btn btn-lg btn-outline-inverse" 
                    onClick={() => this.props.onConfirmationPopupClose(false, this.props.treeId)}>No</button>
            </div>
          </div>
        </div>
        );
      }
  }

  export default require('react-click-outside')(PopupAcceptProgressionTree);