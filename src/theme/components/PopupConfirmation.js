import React from 'react';
import Modal from 'react-modal';
import "~/src/css/PopupLatestTask.css"

class PopupConfirmation extends React.Component {
    constructor(props) {
      super(props);

      this.modalDefaultStyles = {};
    }

    render() {
        return (
        <div className="container-fluid popup-new-project">
            <h2>Are you sure?</h2>
            <p>Milestone is assigned to{this.props.assigneeName}</p>
            <button type="button" className="btn btn-sm btn-outline-inverse" 
                    onClick={() => this.props.onConfirmationPopupClose(true)}>Yes</button>
            <button type="button" className="btn btn-sm btn-outline-inverse" 
                    onClick={() => this.props.onConfirmationPopupClose(false)}>No</button>
        </div>
        );
      }
  }

  export default require('react-click-outside')(PopupConfirmation);