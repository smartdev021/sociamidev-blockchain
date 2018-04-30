import React from 'react';
import Modal from 'react-modal';
import { Icon } from 'react-fa'

import '~/src/theme/css/question-answers-flow.css';
import { getPopupParentElement } from "~/src/common/PopupUtils.js"
import PropTypes from 'prop-types';

import AnswerSimpleQuestion from '~/src/theme/components/tasks/common/AnswerMultipleVariants';
import AnswerMultipleVariants from '~/src/theme/components/tasks/common/AnswerMultipleVariants';
import AnswerTrueFalse from '~/src/theme/components/tasks/common/AnswerTrueFalse';

const answerPersonImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/answer-person.png';
const avatar = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/avatar.png';
const btnNextImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/btn-next.png';
const btnPreviousImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/btn-previous.png';
const feacbookImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/facebook.png';
const linkedInImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/linkedIn.png';
const backArrowImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/back-arrow.png';
const leftArrowImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/left-arrow.png';
const rightArrowImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/right-arrow.png';
const btnSubmitImg = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/submit.png';

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
    return this.props.answersMy[questionId];
  }

  getAnswerPartner(questionId) {
    return this.props.answersPartner && this.props.answersPartner[questionId] ? this.props.answersPartner[questionId].text : "";
  }

  handleNextOrPrevious(action) {
    const { currentQuestion } = this.state;
    const { questions } = this.props;
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

    const { currentQuestion } = this.state;
    const { questions } = this.props;
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
        <AnswerMultipleVariants question={question} answerMy={AnswerMy}
          answerPartner={AnswerPartner} partner={Partner}
          onHandleAnswerCheckbox={(e) => this.props.onHandleAnswerCheckbox(e)} />
        {/*<AnswerTrueFalse question={question} answerMy={AnswerMy}
          answerPartner={AnswerPartner} partner={Partner}
    onHandleAnswerTrueFalse={(e) => this.props.onHandleAnswerTrueFalse(e)} />*/}

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
          {currentQuestion === questions.length - 1 ? <button
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