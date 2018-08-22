/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TimeAgo from 'react-timeago';

import { Icon } from 'react-fa';

import Countdown from 'react-countdown-now';

import ActionLink from '~/src/components/common/ActionLink';

import ActivityTypes from '~/src/common/ActivityTypes';

import TooltipUser from '~/src/theme/components/tasks/TooltipUser';

import PubSub from 'pubsub-js';

import TaskTypes from '~/src/common/TaskTypes';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';

const RenderDummyFriends = false;

/*Helper functions*/
const DayFromNumber = dayNum => {
  const DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return DayNames[dayNum];
};

const MonthFromNumber = monthNum => {
  const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'];

  return MonthNames[monthNum];
};

const GetHangoutPartner = (hangout, props) => {
  let Partner = hangout.metaData.participants.find(function(participant) {
    return participant.user._id != props.currentUserID;
  });

  return Partner;
};

const GetFirstPendingParticipant = (hangout, props) => {
  const FirstPendingParticipant = hangout.metaData.participants.find(function(participant) {
    return participant.status == 'pending';
  });

  return FirstPendingParticipant;
};

const FirstAcceptedParticipants = (hangout, props) => {
  const FirstAcceptedParticipant = hangout.metaData.participants.find(function(participant) {
    return participant.user._id != props.currentUserID && participant.status == 'accepted';
  });

  return FirstAcceptedParticipant;
};

const GetCurrentUserAsParticipant = (hangout, props) => {
  return hangout.metaData.participants.find(function(participant) {
    return participant.user._id == props.currentUserID;
  });
};

const Hours12 = date => {
  return (date.getHours() + 24) % 12 || 12;
};

const GenerateDateString = (time, props) => {
  const DateFromTime = new Date(time);

  const Noon = new Date(
    DateFromTime.getFullYear(),
    DateFromTime.getMonth(),
    DateFromTime.getDate(),
    12,
    0,
    0,
  );

  const AmPm = DateFromTime.getTime() < Noon.getTime() ? 'am' : 'pm';

  const Hours = String(Hours12(DateFromTime)) + AmPm;

  const CurrentDate = new Date();

  const Today = new Date();
  const Tomorrow = new Date(Today.getTime() + 24 * 60 * 60 * 1000);
  const AfterTomorrow = new Date(Tomorrow.getTime() + 24 * 60 * 60 * 1000);
  const ThisSunday = new Date(CurrentDate.setDate(CurrentDate.getDate() - CurrentDate.getDay() + 6));

  let DateString = '';

  if (
    DateFromTime.getFullYear() == Today.getFullYear() &&
    DateFromTime.getMonth() == Today.getMonth() &&
    DateFromTime.getDate() == Today.getDate()
  ) {
    DateString = ` today at ${Hours}`;
  } else if (
    DateFromTime.getFullYear() == Tomorrow.getFullYear() &&
    DateFromTime.getMonth() == Tomorrow.getMonth() &&
    DateFromTime.getDate() == Tomorrow.getDate()
  ) {
    DateString = ` tomorrow at ${Hours}`;
  } else if (
    DateFromTime.getFullYear() == ThisSunday.getFullYear() &&
    DateFromTime.getMonth() == ThisSunday.getMonth() &&
    DateFromTime.getDate() <= ThisSunday.getDate()
  ) {
    DateString = ` on ${DayFromNumber(DateFromTime.getDay())} at ${Hours}`;
  } else {
    DateString = `${DateFromTime.getDate()} ${MonthFromNumber(DateFromTime.getMonth())} at ${Hours}`;
  }

  DateString = `${DateFromTime.getDate()} ${MonthFromNumber(DateFromTime.getMonth())} at ${Hours}`;

  return DateString;
};

const RenderIlluminateActions = (task, props) => {
  switch (task.status) {
    case 'None': {
      return (
        <a className="pur-btn answer-question"
        onClick={() => props.onHangoutActionPerform('answer_questions', task)}>
            Answer questions
        </a>
      );
    }
    case 'complete': {
      return <div className="deep-tools" />;
    }
  }
};

const RenderDecodeActions = (task, props) => {
  switch (task.status) {
    case 'None': {
      return (
        <a className="pur-btn answer-question"
        onClick={() => props.onHangoutActionPerform('answer_questions', task)}>
            Answer questions
        </a>
      );
    }
    case 'complete': {
      return <div className="deep-tools" />;
    }
    default: {
      return null;
    }
  }
};

const openChat = partner => {
  const chatBoxElemet = document.getElementById(partner.user_id);

  if (chatBoxElemet) {
    chatBoxElemet.click();
  } else {
    PubSub.publish('OpenChat', partner);
  }
};

const RenderActions = (hangout, props) => {
  const Partner = GetHangoutPartner(hangout, props);
  const FirstPendingParticipant = GetFirstPendingParticipant(hangout, props);
  const FirstAcceptedParticipant = FirstAcceptedParticipants(hangout, props);

  const TimeHasCome = props.timeNow >= hangout.metaData.time;

  const ButtonStartText = !TimeHasCome ? (
    <span>
      <span>Start </span>
      <Countdown date={hangout.metaData.time} />
    </span>
  ) : (
    <span>Start</span>
  );

  const StartDisabled = !TimeHasCome;

  switch (hangout.status) {
    case 'complete': {
      return <div className="deep-tools" />;
    }
    case 'finished': {
      if (
        hangout.metaData.ratings.findIndex(function(rating) {
          return rating.fromUser == props.currentUserID && rating.toUser == Partner.user._id;
        }) == -1
      ) {
        return (
          <div className="deep-tools">
            <ul>
              <li>
                <ActionLink
                  href="#"
                  onClick={() => props.onHangoutRate(hangout, Partner.user._id, 'good')}
                  className="btn-base btn-red"
                >
                  Good
                </ActionLink>
              </li>
              <li>
                <ActionLink
                  href="#"
                  onClick={() => props.onHangoutRate(hangout, Partner.user._id, 'bad')}
                  className="btn-base btn-red"
                >
                  Bad
                </ActionLink>
              </li>
            </ul>
          </div>
        );
      } else {
        return (
          <a className="btn-feedback">
            Waiting partner's feedback
            <p> Start when both ready</p>
        </a>
        );
      }
    }
    case 'None': {
      if (hangout.creator._id == props.currentUserID) {
        if (FirstAcceptedParticipant) {
          return (
            <div className="deep-tools">
              <ul>
                <li>
                  <ActionLink
                    href="#"
                    onClick={() => props.onHangoutActionPerform('reschedule', hangout)}
                    className="btn-base btn-red"
                  >
                    Reschedule
                  </ActionLink>
                </li>
                <li>
                  <ActionLink
                    href="#"
                    disabled={StartDisabled}
                    onClick={() => props.onHangoutActionPerform('start', hangout)}
                    className={StartDisabled ? 'btn-base btn-red disabled' : 'btn-base btn-red '}
                  >
                    {ButtonStartText}
                  </ActionLink>
                </li>
                <li>
                  <ActionLink
                    href="#"
                    onClick={() => props.onHangoutActionPerform('cancel', hangout)}
                    className="btn-base btn-red"
                  >
                    Cancel
                  </ActionLink>
                </li>
              </ul>
            </div>
          );
        } else if (FirstPendingParticipant) {
          return (
            <div className="deep-tools">
              <ul>
                <li>
                  <ActionLink
                    href="#"
                    onClick={() => props.onHangoutRequestAccept(hangout, FirstPendingParticipant.user)}
                    className="btn-base btn-red"
                  >
                    Accept
                  </ActionLink>
                </li>
                <li>
                  <ActionLink
                    href="#"
                    onClick={() => {
                      openChat(Partner);
                    }}
                    className="btn-base btn-red"
                  >
                    Open Chat
                  </ActionLink>
                </li>
                <li>
                  <ActionLink
                    href="#"
                    onClick={() => props.onHangoutRequestReject(hangout, FirstPendingParticipant.user)}
                    className="btn-base btn-red"
                  >
                    Reject
                  </ActionLink>
                </li>
              </ul>
            </div>
          );
        } else {
          return (
            <div className="deep-tools">
              <ul>
                <li>
                  <ActionLink
                    href="#"
                    onClick={() => props.onHangoutActionPerform('reschedule', hangout)}
                    className="btn-base btn-red"
                  >
                    Reschedule
                  </ActionLink>
                </li>
                <li>
                  <ActionLink
                    href="#"
                    onClick={() => props.onHangoutActionPerform('cancel', hangout)}
                    className="btn-base btn-red"
                  >
                    Cancel
                  </ActionLink>
                </li>
              </ul>
            </div>
          );
        }
      } else {
        return (
          <div className="deep-tools">
            <ul>
              <li>
                <ActionLink
                  href="#"
                  onClick={() => props.onHangoutActionPerform('leave', hangout)}
                  className="btn-base btn-red"
                >
                  Withdraw
                </ActionLink>
              </li>
              <li>
                <ActionLink
                  href="#"
                  onClick={() => {
                    openChat(Partner);
                  }}
                  className="btn-base btn-red"
                >
                  Open Chat
                </ActionLink>
              </li>
            </ul>
          </div>
        );
      }
    }
    case 'started': {
      return (
        <div className="deep-tools">
          <ul>
            <li>
              <ActionLink
                href="#"
                onClick={() => props.onHangoutActionPerform('reschedule', hangout)}
                className="btn-base btn-red"
              >
                Reschedule
              </ActionLink>
            </li>
            <li>
              <ActionLink
                href="#"
                onClick={() => props.onHangoutActionPerform('answer_questions', hangout)}
                className="btn-base btn-red"
              >
                Answer Questions
              </ActionLink>
            </li>
            <li>
              <ActionLink
                href="#"
                onClick={() => props.onHangoutActionPerform('cancel', hangout)}
                className="btn-base btn-red"
              >
                Cancel
              </ActionLink>
            </li>
          </ul>
        </div>
      );
    }
    case 'cancelled':
    case 'canceled': {
      if (hangout.creator._id != props.currentUserID) {
        return (
          <div className="deep-tools">
            <ul>
              <li>
                <ActionLink
                  href="#"
                  onClick={() => props.onHangoutActionPerform('leave', hangout)}
                  className="btn-base btn-red"
                >
                  Withdraw
                </ActionLink>
              </li>
              <li>
                <ActionLink
                  href="#"
                  onClick={() => {
                    openChat(Partner);
                  }}
                  className="btn-base btn-red"
                >
                  Open Chat
                </ActionLink>
              </li>
            </ul>
          </div>
        );
      } else {
        return <div className="deep-tools" />;
      }
    }
    default: {
      return <div className="deep-tools" />;
    }
  }
};

const IlluminateTitleFromStatus = task => {
  let result = (
    // <h4>
    //   {' '}
    //   <a href="#" className="link-yellow" />{' '}
    // </h4>
    <span className="col-heading">{' '}</span>
  );
  switch (task.status) {
    case 'started':
      result = <span className="col-heading">Illuminate is in Progress</span>;
      break;
    case 'finished': {
      result = <span className="col-heading">Illuminate is finished</span>;
      break;
    }
    case 'complete': {
      result = <span className="col-heading">Illuminate is complete</span>;
      break;
    }
    default: {
      result = <span className="col-heading">Illuminate is in Progress</span>
      break;
    }
  }

  return result;
};

const DecodeTitleFromStatus = task => {
  let result = (
    <span className="col-heading">{' '}</span>
  );
  switch (task.status) {
    case 'started':
      result = <span className="col-heading">Decode is in Progress</span>;
      break;
    case 'finished': {
        result = <span className="col-heading">Decode is finished</span>;
      break;
    }
    case 'complete': {
        result = <span className="col-heading">Decode is complete</span>;
      break;
    }
    default: {
        result = <span className="col-heading">Decode is in Progress</span>;
      break;
    }
  }

  return result;
};

const HangoutTitleFromStatus = (task, Partner, props) => {
  let result = (
    <span className="col-heading">{' '}</span>
  );

  if (!Partner) {
    switch (task.status) {
      case 'canceled':
      case 'cancelled': {
        result = <span className="col-heading">Your Deepdive {task._id} has been cancelled</span>;
        break;
      }
      case 'started': {
        result = <span className="col-heading">Your Deepdive {task._id} is in progress</span>;
        break;
      }
      case 'finished': {
        result = <span className="col-heading">Your Deepdive {task._id} is finished</span>;
        break;
      }
      case 'complete': {
        result = <span className="col-heading">Your Deepdive is complete</span>;
        break;
      }
      default: {
        result = <span className="col-heading">Your Deepdive has no any mets yet</span>;
        break;
      }
    }
  } else {
    switch (task.status) {
      case 'canceled':
      case 'cancelled': {
        result = (
          <h4>
            Deepdive with{' '}
            <TooltipUser user={Partner} currentUser={props.userProfile}>
              <a href="#" className="link-yellow">
                {Partner.user.firstName}
              </a>
            </TooltipUser>{' '}
            has been cancelled
          </h4>
        );
        break;
      }
      case 'started': {
        result = (
          <span className="col-heading">
            Deepdive with{' '}
            <TooltipUser user={Partner} currentUser={props.userProfile}>
              <a href="#" className="link-yellow">
                {Partner.user.firstName}
              </a>
            </TooltipUser>{' '}
            is in progress
        </span>
        );
        break;
      }
      case 'finished': {
        result = (
            <span className="col-heading">
                Deepdive with{' '}
                    <TooltipUser user={Partner} currentUser={props.userProfile}>
                    <a href="#" className="link-yellow">
                        {Partner.user.firstName}
                    </a>
                    </TooltipUser>{' '}
                is finished
            </span>
        );
        break;
      }
      case 'complete': {
        result = (
            <span className="col-heading">
                Deepdive with{' '}
                <TooltipUser user={Partner} currentUser={props.userProfile}>
                <a href="#" className="link-yellow">
                    {Partner.user.firstName}
                </a>
                </TooltipUser>{' '}
                is complete
            </span>
        );
        break;
      }
      default: {
        if (Partner.status == 'accepted') {
          result = (
            <span className="col-heading">
                Confirmed Deepdive with{' '}
                <TooltipUser user={Partner} currentUser={props.userProfile}>
                    <a href="#" className="link-yellow">
                    {Partner.user.firstName}
                    </a>
                </TooltipUser>
            </span>
          );
        } else if (Partner.status == 'pending') {
          result = (
            <span className="col-heading">
                <TooltipUser user={Partner} currentUser={props.userProfile}>
                    <a href="#" className="link-yellow">
                    {Partner.user.firstName}{' '}
                    </a>
                </TooltipUser>
                {` wants to join your "${task.metaData.subject.skill.name}" Deepdive`}
            </span>
          );
        }
        break;
      }
    }
  }

  return result;
};

const RenderTaskTitle = (task, props) => {
  let result = (
    <span className="col-heading">
        {' '}
    </span>
  );

  if (task.type === TaskTypes.DEEPDIVE) {
    const Partner = GetHangoutPartner(task, props);

    //Current user has created this hangout
    if (task.creator._id == props.currentUserID) {
      result = HangoutTitleFromStatus(task, Partner, props);
    } else {
      const CurrentUserAsParticipant = GetCurrentUserAsParticipant(task, props);

      //Why is this possible???
      if (!CurrentUserAsParticipant) {
        result = (
            <span className="col-heading">
                {' '}
            </span>
        );
      } else {
        //for Sent Requests
        switch (CurrentUserAsParticipant.status) {
          case 'pending': {
            result = (
                <span className="col-heading">
                    Your request to Deepdive with{' '}
                    <TooltipUser user={Partner} currentUser={props.userProfile}>
                    <a href="#" className="link-yellow">
                        {Partner.user.firstName}
                    </a>
                    </TooltipUser>{' '}
                    is pending approval
                </span>
            );
            break;
          }
          case 'rejected': {
            result = (
                <span className="col-heading">
                    <TooltipUser user={Partner} currentUser={props.userProfile}>
                        <a href="#" className="link-yellow">
                            {Partner.user.firstName}
                        </a>
                        </TooltipUser>{' '}
                    has not confirmed your request to join theirs Deepdive
                </span>
            );
            break;
          }
          default: {
            //request 'accepted'
            result = HangoutTitleFromStatus(task, Partner, props);
            break;
          }
        }
      }
    }
  } else if (task.type === TaskTypes.ILLUMINATE) {
    result = IlluminateTitleFromStatus(task);
  } else if (task.type === TaskTypes.DECODE) {
    result = DecodeTitleFromStatus(task);
  } else {
    result = <div id="title">{task.name}</div>;
  }

  return result;
};

const RenderTask = (task, i, props) => {
  const DebugOutputClick = task => {
    let taskCopy = Object.assign({}, task);
    if (taskCopy.metaData.time) {
      taskCopy.dateHangoutShouldStart = new Date(taskCopy.metaData.time);
    }

    if (taskCopy.timeStatusChanged) {
      taskCopy.dateHangoutStatusChanged = new Date(taskCopy.timeStatusChanged);
    }
  };

  const TaskColClass = props.isCollapsed ? 'col-lg-12' : 'col-lg-4';

  const createdDate = new Date(task.date);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateTimeString =
    createdDate.getDate() + ' ' + months[createdDate.getMonth()] + ' ' + createdDate.getFullYear();
  if (task.type === TaskTypes.DEEPDIVE) {
    const taskTime = task.status == 'None' ? task.metaData.time : task.timeStatusChanged;
    let taskDate = GenerateDateString(taskTime, props);
    const SkillName = task.metaData.subject.skill.name;
    let ThirdLine = GenerateDateString(taskTime, props);
    if (taskTime < new Date()) taskDate = 'Start when both ready';
    return (
        <div className="col-md-6" key={i}>
            <div className="col-box-wp no-padding">
                <div className="top-head" style={{padding:'10px 10px'}}>
                    <div className="profile-icon">
                        <img src="https://s3.us-east-2.amazonaws.com/admin.soqqle.com/userProfile/avatar_1534087468249" alt="" />
                    </div>
                    <div className="task-text">
                      <span className="col-heading">{RenderTaskTitle(task, props)}</span>
                      <span className="bule-text">
                        <TimeAgo date={createdDate} minPeriod={60} />
                      </span>
                    </div>
                    
                </div>
                <div className="att-box task-id">TaskId: {task._id}}</div>
                <div className="att-box">
                    <div className="task-att">SKILL</div>
                    <div className="task-att-name">{SkillName}</div>    
                </div>
                <div className="att-box" style={{height:'70px'}}>
                    <div className="task-att">DATE</div>
                    <div className="task-att-name">{taskDate}</div>
                </div>
                {RenderActions(task, props)}
            </div>
        </div>
    );
  } else if (task.type === TaskTypes.ILLUMINATE) {
    const taskTime = task.status == 'None' ? task.metaData.time : task.timeStatusChanged;
    const SkillName = task.metaData.subject.skill.name;
    return (
        <div className="col-md-6" key={i}>
            <div className="col-box-wp no-padding">
                <div className="top-head" style={{padding:'10px 10px'}}>
                    <div className="profile-icon">
                        <img src="https://s3.us-east-2.amazonaws.com/admin.soqqle.com/userProfile/avatar_1534087468249" alt="" />
                    </div>
                    <div className="task-text">
                      <span className="col-heading">{RenderTaskTitle(task, props)}</span>
                      <span className="bule-text">
                        <TimeAgo date={createdDate} minPeriod={60} />
                      </span>
                    </div>
                </div>
                <div className="att-box task-id">TaskId: {task._id}}</div>
                <div className="att-box">
                    <div className="task-att">SKILL</div>
                    <div className="task-att-name" onClick={() => DebugOutputClick(task)}>{SkillName}</div>    
                </div>
                <div className="att-box" style={{height:'70px'}}>
                    <div className="task-att">DATE</div>
                    <div className="task-att-name">{dateTimeString}</div>
                </div>
                {RenderIlluminateActions(task, props)}
            </div>
        </div>
    );
  } else if (task.type === TaskTypes.DECODE) {
    const taskTime = task.status == 'None' ? task.metaData.time : task.timeStatusChanged;
    const SkillName = task.metaData.subject.skill.name;
    return (
        <div className="col-md-6" key={i}>
            <div className="col-box-wp no-padding">
                <div className="top-head" style={{padding:'10px 10px'}}>
                    <div className="profile-icon">
                        <img src="https://s3.us-east-2.amazonaws.com/admin.soqqle.com/userProfile/avatar_1534087468249" alt="" />
                    </div>
                    <div className="task-text">
                      <span className="col-heading">{RenderTaskTitle(task, props)}</span>
                      <span className="bule-text">
                        <TimeAgo date={createdDate} minPeriod={60} />
                      </span>
                    </div>
                </div>
                <div className="att-box task-id">TaskId: {task._id}}</div>
                <div className="att-box">
                    <div className="task-att">SKILL</div>
                    <div className="task-att-name" onClick={() => DebugOutputClick(task)}>{SkillName}</div>    
                </div>
                <div className="att-box" style={{height:'70px'}}>
                    <div className="task-att">DATE</div>
                    <div className="task-att-name">{dateTimeString}</div>
                </div>
                {RenderDecodeActions(task, props)}
            </div>
        </div>
    );
  }

  return (
    <div className={TaskColClass} key={i}>
      <div className="my-tasks-task">
        {RenderTaskTitle(task, props)}
        <div id="description" onClick={() => DebugOutputClick(task)}>
          {task.description}
        </div>
      </div>
    </div>
  );
}

const RenderTasks = props => {
  if (!props.tasks || props.tasks.length == 0) {
    return null;
  }

  return props.tasks.map((task, i) => {
    return RenderTask(task, i, props);
  });
};

class MyTasks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row">{RenderTasks(this.props)}</div>
    )
  }
}

MyTasks.propTypes = {};

export default MyTasks;
