/*
    author: Alexander Zolotov
*/
import React from 'react';

import MySubtasks from './MySubtasks'
import ActionLink from '~/src/components/common/ActionLink'

const RenderSingleHangout = (hangout, i, props) => {
  if (props.selectedCategory.type == "requested_hangouts") {
    const FirstPendingParticipant = hangout.metaData.participants.find(function(participant){
      return participant.status == "pending";
    });

    if (FirstPendingParticipant) {
      return(
        <li key={i}>
          {
            <span>
              {FirstPendingParticipant.user.firstName} (level 5) wants to join your Hangout on a roadmap {hangout.metaData.subject.roadmap.name}
            </span>
          }
          <span>
            <ActionLink href="#" onClick={()=>props.onHangoutRequestAccept(hangout, FirstPendingParticipant.user)}>Accept</ActionLink>
            <ActionLink href="#" onClick={()=>props.onHangoutRequestReject(hangout, FirstPendingParticipant.user)}>Reject</ActionLink>
          </span>
        </li>
      );
    }
    else if (hangout.metaData.participants.length > 1) {
      return(
        <li key={i}>
          {
            <span>
              Your hangout for roadmap {hangout.metaData.subject.roadmap.name} has no new requests.
            </span>
          }
        </li>
      );
    }
    else {
      return(
        <li key={i}>
          {
            <span>
              Your hangout for roadmap {hangout.metaData.subject.roadmap.name} hasn't received any requests yet.
            </span>
          }
        </li>
      );
    }
  }
  else {
    return(
      <li key={i}>
        You've requested to join a Hangout on a roadmap {hangout.metaData.subject.roadmap.name}
      </li>
    );
  }
  
};

const MyHangouts = (props) => {

    console.log("MyHangouts!!!!!!!!!!!");
    console.dir(props.hangouts);
   
    if (props.hangouts.length > 0) {
      return (
        <div className="row">
          <div className="col-lg-12">
            <div id="my-hangouts">
              <h3>My Hangouts</h3>
            </div>
          </div>
          <div className="col-lg-12">
            <div id="my-hangouts-list">
              <ul>
                {
                  props.hangouts.map(function(hangout, i){
                    return (RenderSingleHangout(hangout, i, props));
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="row">
          <div className="col-lg-12">
            <div id="my-hangouts">
              <h1>My Hangouts</h1>
            </div>
          </div>
        </div>
      );
    }
}

export default MyHangouts;