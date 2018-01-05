/*
    author: Alexander Zolotov
*/
import React from 'react';

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/organizer.css"

const RenderList = (props) => {
  return (
    <div id="organizer-list">
      <h2>Your Organizer</h2>
      <ul>
        <li>
          <span className="organizer-list-item-text">It's 3PM, have you met John yet?</span>
          <span className="organizer-list-item-actions pull-right">
            <ActionLink href="#" className="organizer-action-link">Start</ActionLink>
            <ActionLink href="#" className="organizer-action-link">Reschedule</ActionLink>
            <ActionLink href="#" className="organizer-action-link">Cancel</ActionLink>
          </span>
        </li>
        <li>
          <span className="organizer-list-item-text">You met Mary yesterday at 3pm for Java. How was it?</span>
          <span className="organizer-list-item-actions pull-right">
            <ActionLink className="organizer-action-link" href="#">Good</ActionLink>
            <ActionLink href="#" className="organizer-action-link">Bad</ActionLink>
          </span>
        </li>
        <li>
          <span className="organizer-list-item-text">You submitted your answers with John yesterday, but it failed our spam check.</span>
          <span className="organizer-list-item-actions pull-right">
            <ActionLink href="#" className="organizer-action-link">Edit Answers</ActionLink>
          </span>
        </li>
        <li>
          <span className="organizer-list-item-text">You submitted your answers with John yesterday. You will receive 5 virtue points.</span>
          <span className="organizer-list-item-actions pull-right">
            <ActionLink href="#" className="organizer-action-link">Edit Answers</ActionLink>
          </span>
        </li>
      </ul>
    </div>
  );
}

const RenderStatusBox = (props) => {
  return (
    <div id="organizer-status-box">
      <h2>You are now meeting John</h2>
      <div id="actions">
        <ActionLink href="#" className="organizer-action-link">Cancel</ActionLink>
        <ActionLink href="#" className="organizer-action-link">Reschedule</ActionLink>
        <div><ActionLink href="#" className="organizer-action-link">Answer Questions</ActionLink></div>
      </div>
    </div>
  );
}

const Organizer = (props) => {
    return (
      <div className="row">
        <div className="col-lg-8">
          {RenderList(props)}
        </div>
        <div className="col-lg-4">
          {RenderStatusBox(props)}
        </div>
      </div>
    );
}

export default Organizer;