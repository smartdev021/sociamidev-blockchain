import React from 'react';
import Modal from 'react-modal';
import "~/src/css/PopupHangoutAnswers.css"

import ActionLink from '~/src/components/common/ActionLink'

class PopupHangoutAnswers extends React.Component {
    constructor(props) {
      super(props);
      
      this.modalDefaultStyles = {};
    }

    componentWillMount() {
      console.log("PopupHangoutAnswers::componentWillMount");
      this.modalDefaultStyles = Modal.defaultStyles;

      Modal.defaultStyles.content.border = "7px solid white";
      Modal.defaultStyles.content.background = "transparent";
      Modal.defaultStyles.content.overflow = "visible";
      Modal.defaultStyles.content.padding = '0';
      Modal.defaultStyles.content["minHeight"] = '500px';
      Modal.defaultStyles.content["marginLeft"] = 'auto';
      Modal.defaultStyles.content["marginRight"] = 'auto';
      Modal.defaultStyles.content["left"] = '0';
      Modal.defaultStyles.content["right"] = '0';
      Modal.defaultStyles.content["width"] = '90%';
      Modal.defaultStyles.content["maxWidth"] = '90%';

      Modal.defaultStyles.overlay.background = "rgba(0, 0, 0, 0.25)";
    }

    componentWillUnmount() {
      console.log("PopupHangoutAnswers::componentWillUnmount");
      Modal.defaultStyles = this.modalDefaultStyles;
    }

    renderQuestions() {
      const Partner = this.props.partner;
      
      return (
      <div id="questions-list">
        <div className="container-fluid">
          {
            this.props.questions.map(function(question, i) {

              return (
                <div className="row" key={i}>
                  <div className="col-lg-12">
                    <div className="question-name">
                      <span>{question.question}</span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <textarea id={`answer_your_${question._id}`} 
                        className="form-control validate-field required question-text-area" placeholder="You"
                          name="answer_your" onChange={(e)=>{}}/>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <textarea readOnly={true} tabIndex="-1" id={`answer_partner_${question._id}`} 
                        className="form-control validate-field required question-text-area" placeholder={Partner.user.firstName}
                          name="answer_partner" onChange={(e)=>{}}/>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
    </div>
      )
    }

    renderHangoutAnswers() {
      const title = "Earn up to 30 tokens by completing this task with Alexander";

      return (
        <Modal 
        isOpen={true}
        onRequestClose={() => this.props.onCloseModal()}
        contentLabel={title}>
        <div className="container-fluid popup-hangout-qustions">
        <ActionLink href='#' className="glyphicon glyphicon-remove popup-close-icon" onClick={() => this.props.onCloseModal()}></ActionLink>
        <div className="row">
              <div className="col-lg-12 text-center">
                <span className="popup-hangout-title">Earn up to <i>30 tokens</i> by completing this task with Alexander</span>
            </div>
            </div>
            
            <div className="row">
              <div className="col-lg-12">
                {this.renderQuestions()}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="popup-hangout-answers-button-container">
                  <button type="button" className="btn btn-sm btn-outline-inverse pull-right" 
                    onClick={() => this.props.onSubmit()}>Submit</button>
                </div>
              </div>
            </div>
            
              </div>
      </Modal>
      );
    }

    handleClickOutside() {
      () => this.props.onCloseModal();
    }

    render() {
        return (
          <div>
            {this.renderHangoutAnswers()}
          </div>
        );
    }
  }

  export default require('react-click-outside')(PopupHangoutAnswers);