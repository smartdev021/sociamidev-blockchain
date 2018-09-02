import React from 'react';
import Modal from 'react-modal';
import { Icon } from 'react-fa';

import '~/src/theme/css/question-answers-flow.css';
import { getPopupParentElement } from '~/src/common/PopupUtils.js';
import PropTypes from 'prop-types';

import QuestionTypes from '~/src/common/QuestionTypes';

import AnswerSimpleQuestion from '~/src/theme/components/tasks/common/AnswerSimpleQuestion';
import AnswerMultipleVariants from '~/src/theme/components/tasks/common/AnswerMultipleVariants';
import AnswerTrueFalse from '~/src/theme/components/tasks/common/AnswerTrueFalse';
import { loadURL } from '~/src/redux/actions/tasks';

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
      currentQuestion: 0,
      viewRight: false,
    };
    this.getAnswerMy = this.getAnswerMy.bind(this);
    this.getAnswerPartner = this.getAnswerPartner.bind(this);
    this.getAnswerOthers = this.getAnswerOthers.bind(this);
    // this.setLoadURL = this.getLoadURL.bind(this);
  }

  getAnswerMy(questionId) {
    return this.props.answersMy[questionId];
  }

  getAnswerPartner(questionId) {
    if (this.props.answersPartner)
      return this.props.answersPartner[questionId] ? this.props.answersPartner[questionId].text : '';
    else return '';
  }

  getAnswerOthers(questionId) {
    if (this.props.answersOtherUsers) {
      const answersOtherUsers =
        this.props.answersOtherUsers.length > 0
          ? this.props.answersOtherUsers.filter(a => a.questionId === questionId)
          : [];
      return answersOtherUsers.slice(0, 3);
    } else return [];
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
        currentQuestion: action === 'prev' ? currentQuestion - 1 : currentQuestion + 1,
      });
    }
  }

  renderAnswerInput() {
    const { currentQuestion } = this.state;
    const { questions } = this.props;
    const Partner = this.props.partner;
    const question = questions[currentQuestion];
    const AnswerMy = this.getAnswerMy(question._id);
    const AnswerPartner = this.getAnswerPartner([question._id]);

    if (question) {
      switch (question.type) {
        case QuestionTypes.TRUEFALSE: {
          return (
            <AnswerTrueFalse
              question={question}
              answerMy={AnswerMy}
              answerPartner={AnswerPartner}
              partner={Partner}
              onHandleAnswerTrueFalse={e => this.props.onHandleAnswerTrueFalse(e)}
            />
          );
        }
        case QuestionTypes.MULTIPLECHOICE: {
          return (
            <AnswerMultipleVariants
              question={question}
              answerMy={AnswerMy}
              answerPartner={AnswerPartner}
              partner={Partner}
              onHandleAnswerCheckbox={e => this.props.onHandleAnswerCheckbox(e)}
            />
          );
        }
        default: {
          return (
            <AnswerSimpleQuestion
              question={question}
              answerMy={AnswerMy}
              answerPartner={AnswerPartner}
              partner={Partner}
              onHandleAnswerInput={e => this.props.onHandleAnswerInput(e)}
            />
          );
        }
      }
    } else {
      return null;
    }
  }

  render() {
    if (this.props.isLoading || this.props.isSubmitting || this.props.questions.length === 0) {
      const LoadingText = this.props.isSubmitting ? 'Submitting...' : 'Loading...';
      return (
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="popup-questions-loading-text">
              {LoadingText}
              <Icon spin name="spinner" />
            </h2>
          </div>
        </div>
      );
    }

    const { currentQuestion } = this.state;
    const { questions } = this.props;
    const Partner = this.props.partner;
    const question = questions[currentQuestion];
    const AnswerMy = this.getAnswerMy(question._id);
    const AnswerPartner = this.getAnswerPartner([question._id]);
    const AnswerOthers = this.getAnswerOthers(question._id);
    const renderAnswerOthers = AnswerOthers.map(ans => {
      return (
        <span className="answer-avatar-container">
          <img src={avatar} />
          <span className="answer-text-text">{ans.answer.text}</span>
        </span>
      );
    });

    let partnerName = this.props.partner ? `${this.props.partner.user.firstName} :`  : null

    let partnerMsg = AnswerPartner.trim() ? {partnerName} + ' ' + {AnswerPartner} : null

    return (
      <div className="QuestionAnswersFlow-container">
        <div className="QuestionAnswersFlow-back-to-tasks-ctn">
          <button type="button" onClick={this.props.onBackToMyTasks} className="close" aria-label="Close">
            <span aria-hidden="true" style={{ fontSize: '18px' }}>
              &times;
            </span>
          </button>
        </div>
        <div className="QuestionAnswersFlow-current-question-indicator">
          <p className="QuestionAnswersFlow-main-question">
            ({`${currentQuestion + 1} / ${questions.length}`}) {question.question}
          </p>
        </div>
        <div className="QuestionAnswersFlow-previous-next-side">
          <div className="QuestionAnswersFlow-previous">
            <a
              className="btn-prev QuestionAnswersFlow-previous"
              onClick={this.handleNextOrPrevious.bind(this, 'prev')}
            >
              ◀ previous
            </a>
          </div>
          <div className="QuestionAnswersFlow-next">
            {currentQuestion === questions.length - 1 ? (
              <a className="btn-next QuestionAnswersFlow-next" onClick={e => this.props.onSubmit(e)}>
                submit ▶
              </a>
            ) : (
              <a
                className="btn-next QuestionAnswersFlow-next"
                onClick={this.handleNextOrPrevious.bind(this, 'next')}
              >
                next ▶
              </a>
            )}
          </div>
        </div>
        {this.renderAnswerInput()}
        <div className="QuestionAnswersFlow-social-share">
          {/* <span>Jhon: It will change finance and healthcare the most</span> */}
          <span style={{color:"darkgrey"}}>{partnerMsg}</span>
        </div>
      </div>
    );
  }
}

QuestionAnswersFlow.PropTypes = {
  onBackToMyTasks: PropTypes.func.isRequired,
};

export default require('react-click-outside')(QuestionAnswersFlow);
