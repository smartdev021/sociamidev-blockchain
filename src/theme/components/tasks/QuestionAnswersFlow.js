import React from 'react';
import Modal from 'react-modal';
import {Icon} from 'react-fa'

import '~/src/theme/css/question-answers-flow.css';
import {getPopupParentElement} from "~/src/common/PopupUtils.js"
import answerPersonImg from '~/src/theme/images/answer-person.png';
import avatar from '~/src/theme/images/avatar.png';
import btnNextImg from '~/src/theme/images/btn-next.png';
import btnPreviousImg from '~/src/theme/images/btn-previous.png';
import feacbookImg from '~/src/theme/images/facebook.png';
import linkedInImg from '~/src/theme/images/linkedIn.png';
import backArrowImg from '~/src/theme/images/back-arrow.png';
import leftArrowImg from '~/src/theme/images/left-arrow.png';
import rightArrowImg from '~/src/theme/images/right-arrow.png';
import btnSubmitImg from '~/src/theme/images/submit.png';
import PropTypes from 'prop-types';

class QuestionAnswersFlow extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentQuestion: 0
    }
    this.getAnswerMy = this.getAnswerMy.bind(this)
    this.getAnswerPartner = this.getAnswerPartner.bind(this)
  }

  getAnswerMy(questionId) {
    return 
  }

  getAnswerPartner(questionId) {
    return this.props.answersPartner && this.props.answersPartner[questionId] ? this.props.answersPartner[questionId].text : "";
  }

  handleNextOrPrevious(action) {
    const { currentQuestion } = this.state;
    const {questions} = this.props;
    if (
      (currentQuestion === 0 && action === 'prev') ||
      (currentQuestion === questions.length - 1 && action === 'next')
    ) {
      return;
    } else {
      this.setState({
        currentQuestion:
          action === 'prev' ? currentQuestion - 1 : currentQuestion + 1
      });
    }
  }

  render() {

    if (this.props.isLoading || this.props.isSubmitting || this.props.questions.length === 0) {
      const LoadingText = this.props.isSubmitting ? "Submitting..." : "Loading...";
      return (
        <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="popup-questions-loading-text">{LoadingText}<Icon spin name="spinner" /></h2>
            </div>
            </div>
      );
    }

    const {currentQuestion} = this.state;
    const {questions} = this.props;
    const Partner = this.props.partner;
    const question = questions[currentQuestion];
    const AnswerMy = this.getAnswerMy([question._id]);
    const AnswerPartner = this.getAnswerPartner([question._id]);
    
    return (
      <div className="QuestionAnswersFlow-container">
        <div className="QuestionAnswersFlow-back-to-tasks-ctn">
          <button onClick={this.props.onBackToMyTasks}>
            <img src={backArrowImg} />&nbsp;&nbsp;BACK TO MY TASKS
          </button>
        </div>
        <div className="QuestionAnswersFlow-current-question-indicator">
          <img src={leftArrowImg} />
          <span>{`${currentQuestion + 1} of ${questions.length}`}</span>
          <img src={rightArrowImg} />
        </div>
        <div>
          <h3 className="QuestionAnswersFlow-main-question">
            {question.question}
          </h3>
        </div>
        <div className="QuestionAnswersFlow-answer">
          <span>
            <img src={answerPersonImg} alt="answer-person-avatar" />
          </span>
          <span className="QuestionAnswersFlow-answer-text">
            The reason that non-parametric classifiers are slower is because
            they often have far more parameters to train...
            <a href="#">&nbsp;&nbsp;Show more</a>
          </span>
        </div>
        <div className="QuestionAnswersFlow-other-players-answers">
          <span className="QuestionAnswersFlow-other-players-answers-text">
            Other players' answers
          </span>
          <span className="QuestionAnswersFlow-other-players-answers-images">
            <span className="answer-avatar-container">
              <img src={avatar} />
              <span className="answer-text-text">
                The reason that non-paramet- ric classifiers are slower is
                because they often have far more parameters to train.
              </span>
            </span>
            <span className="answer-avatar-container">
              <img src={avatar} />
              <span className="answer-text-text">
                because they often have far more parameters to train. The reason
                that non-paramet- ric classifiers are slower is
              </span>
            </span>
            <span className="answer-avatar-container">
              <img src={avatar} />
              <span className="answer-text-text">
                The reason that non-paramet- ric classifiers are slower is
                because they often have far more parameters to train.
              </span>
            </span>
          </span>
        </div>
        <div className="QuestionAnswersFlow-textarea">
        <textarea id={`answer_your_${question._id}`} 
                        className="validate-field required question-text-area"
                          name="answer_your" onChange={(e)=>that.props.onHandleAnswerInput(e)} value={AnswerMy}/>
        {Partner &&
            <div className="col-lg-6">
              <div className="form-group">
                <textarea readOnly={true} tabIndex="-1" id={`answer_partner_${question._id}`} 
                  className="validate-field required question-text-area" placeholder={Partner.user.firstName}
                    name="answer_partner" onChange={(e)=>that.props.onHandleAnswerInput(e)} value={AnswerPartner}/>
              </div>
            </div>
        }
        </div>
        <div className="QuestionAnswersFlow-social-share">
          <span>World must know my answer</span>
          <a href="#">
            <img src={linkedInImg} />
          </a>
          <a href="#">
            <img src={feacbookImg} />
          </a>
        </div>
        <div className="QuestionAnswersFlow-prev-next-ctn">
          <button
            className="btn-prev"
            onClick={this.handleNextOrPrevious.bind(this, 'prev')}
          >
            <img src={btnPreviousImg} />
          </button>
          {currentQuestion === questions.length-1 ? <button
            className="btn-next"
            onClick={(e) => this.props.onSubmit(e)}
          >
            <img src={btnSubmitImg} />
          </button>
            : <button
            className="btn-next"
            onClick={this.handleNextOrPrevious.bind(this, 'next')}
          >
            <img src={btnNextImg} />
          </button>}
        </div>
      </div>
    );
  }
}

QuestionAnswersFlow.PropTypes = {
  onBackToMyTasks: PropTypes.func.isRequired
};

  export default require('react-click-outside')(QuestionAnswersFlow);