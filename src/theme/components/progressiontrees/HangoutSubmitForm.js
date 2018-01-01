/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

const RenderForm = (props) => {
  return (
    <form action="#" onSubmit={(e) => props.onHandleStartHangout(e)}>
      <label className="radio-inline">
        Day
      </label>
      <label className="radio-inline">
        <input type="radio" name="optradio"/>Today
      </label>
      <label className="radio-inline">
        <input type="radio" name="optradio"/>Tomorrow
      </label>
      <label className="radio-inline">
        <input type="radio" name="optradio"/>Day After
      </label>
      <input type="date" className="validate-field required" data-validation-type="string" 
        id="date" name="date" autoComplete="off" placeholder="Date"/>
      <div>
        <label className="radio-inline">
          Time
        </label>
        <input type="text" className="validate-field required" data-validation-type="string" 
          id="hour" name="date" autoComplete="off" placeholder="hour"/>
        <input type="text" className="validate-field required" data-validation-type="string" 
          id="minite" name="date" autoComplete="off" placeholder="minute"/>
      </div>
      <button type="submit" className="btn btn-md btn-outline-inverse pull-right">Submit</button>
    </form>
  );
}

const HangoutSubmitForm = (props) => {
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
            {RenderForm(props)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HangoutSubmitForm;