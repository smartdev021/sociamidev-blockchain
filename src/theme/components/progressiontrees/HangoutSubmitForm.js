/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

class HangoutSubmitForm extends React.Component {

  constructor(props) {
    super(props);

    const timeNow = Date.now();
    const dateNow = new Date(timeNow);

    this.state = {
     dayPeriod: "today",
     date: dateNow,

     dateInputValue: "2020-01-01",
     timeInputValue: "00:00",
    }
  }

  handleDateInputChange(e) {
    e.preventDefault();

    this.setState({dateInputValue: e.target.value});

    console.log(e.target.value);
  }

  handleTimeInputChange(e) {
    e.preventDefault();

    this.setState({timeInputValue: e.target.value});

    console.log(e.target.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dateInputValue != prevState.dateInputValue) {
      console.log(this.state.dateInputValue);
    }

    if (this.state.timeInputValue != prevState.timeInputValue) {
      console.log(this.state.timeInputValue);
    }

    if (prevState.dayPeriod != this.state.dayPeriod) {
      if (this.state.dayPeriod != "other") {
        switch (this.state.dayPeriod) {
          case "today": {
            const timeNow = Date.now();
            const dateNow = new Date(timeNow);
            this.setState({date: dateNow});
            break;
          }
          case "tomorrow": {
            let timeNow = Date.now() + (60 * 60 * 24);
            const dateNow = new Date(timeNow);
            this.setState({date: dateNow});
            break;
          }
          case "day_after": {
            let timeNow = Date.now() + ((60 * 60 * 24) * 2);
            const dateNow = new Date(timeNow);
            this.setState({date: dateNow});
            break;
          }
          default:
            break;
        }
      }
      else {

      }
    }
  }

  handleOptionChange(e) {
    this.setState({dayPeriod: e.target.value});
  }

  handleStartHangout(e) {
    e.preventDefault();

    let date = new Date(this.state.dateInputValue + ' ' + this.state.timeInputValue);

    console.log(`handleStartHangout date: ${date.getTime()}`);
    console.log(date.toDateString());

    this.props.onHandleStartHangout(date);
  }

  renderForm()  {
    return (
      <form action="#" onSubmit={(e) => this.handleStartHangout(e)}>
        <label className="radio-inline">
          Day
        </label>
        <label className="radio-inline">
          <input type="radio" name="optradio" value="today" checked={this.state.dayPeriod=="today"} onChange={(e)=>this.handleOptionChange(e)}/>Today
        </label>
        <label className="radio-inline">
          <input type="radio" name="optradio" value="tomorrow" checked={this.state.dayPeriod=="tomorrow"} onChange={(e)=>this.handleOptionChange(e)}/>Tomorrow
        </label>
        <label className="radio-inline">
          <input type="radio" name="optradio" value="day_after" checked={this.state.dayPeriod=="day_after"} onChange={(e)=>this.handleOptionChange(e)}/>Day After
        </label>
        <label className="radio-inline">
          <input type="radio" name="optradio" value="other" checked={this.state.dayPeriod=="other"} onChange={(e)=>this.handleOptionChange(e)}/>Other
        </label>
        {this.state.dayPeriod == "other" && 
          <input type="date" className="validate-field required" data-validation-type="string" 
            id="date" name="date" autoComplete="off" placeholder="Date" defaultValue={this.state.dateInputValue}
              onChange={(e)=>this.handleDateInputChange(e)}/>}
        <div>
          <label className="radio-inline">
            Time
          </label>
          <input type="time" className="validate-field required input-time" data-validation-type="string" 
            id="time" name="date" autoComplete="off" placeholder="00-00" defaultValue={this.state.timeInputValue}
              onChange={(e)=>this.handleTimeInputChange(e)}/>
        </div>
        <button type="submit" className="btn btn-md btn-outline-inverse pull-right">Submit</button>
      </form>
    );
  }

  render() {
    return (
      <div id="hangout-submit-form">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h4>Greate! You want to Hangout!</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p>
                People work better in a teams and can achieve whay more than when going into it yourself.
                You will get matched to someone with the same interest to solve some questions at the time
                you select below.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {this.renderForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default HangoutSubmitForm;