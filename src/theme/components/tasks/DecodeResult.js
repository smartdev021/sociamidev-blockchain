import React, { Component } from 'react';

import '~/src/theme/css/taskBrowser.css';

class DecodeResult extends Component {
  constructor(props) {
    super(props);
  }

  renderQuestion(data){
      const result = this.checkResult(data.correctAnswers, this.props.answersMy[data._id]);
      return (
          <div key={data._id} className='each-question'>
              <span style={{fontSize: '19px', color: !result ? '#9b01aa' : 'green'}} 
              dangerouslySetInnerHTML={{__html: !result ? "&times;" : "&#10003;"}} />
              <div style={{textAlign: 'center', fontSize: '14px'}}>{data.question}</div>
              <span className="see-more">SEE MORE</span>
          </div>
      )
  }

  checkResult(correct, userAnswered){
     const userAnsweredIndex = userAnswered.options.filter(item => item).map((item, index) => index);
     return this.compareArray(correct, userAnsweredIndex);
  }

  annoucePassOrFailed(){
      let count = 0;
      this.props.questions.map(item => {
          if(this.checkResult(item.correctAnswers, this.props.answersMy[item._id]))
            count++;
      })
      return count > this.props.questions.length / 2;
  }

  compareArray(arr1, arr2){
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  renderLeftContent(data){
      const total = data.length;
      const lstLeftContent = data.filter((item, index) => index < total / 2);
      return lstLeftContent.map(item => this.renderQuestion(item));
  }

  renderRightContent(data){
    const total = data.length;
    const lstRightContent = data.filter((item, index) => index > total / 2 - 1 && index < total);
    return lstRightContent.map(item => this.renderQuestion(item));
  }

  render() {
    return (
        <div className="decode-result-area">
            <button type="button" aria-label="Close" onClick={() => this.props.onCloseResult()} 
             style={{position: 'absolute', top: '0', right: '1px'}}>
                <span aria-hidden="true" style={{ fontSize: '19px' }}>
                &times;
                </span>
          </button>
          <div className="result">
              {this.annoucePassOrFailed() ? 'You passed!' : 'You failed!'}
          </div>
          <div className="main-content">
             <div className="left">{this.renderLeftContent(this.props.questions)}</div>
             <div className="middle"></div>
             <div className="right">{this.renderRightContent(this.props.questions)}</div>
          </div>
          <div style={{padding: '15px'}} className="footer">
              <button onClick={() => this.props.onCloseResult()}>Accept</button>
          </div>
        </div>
    );
  }
}

export default DecodeResult;
