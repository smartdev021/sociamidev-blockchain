import React from 'react';
import Tooltip from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap.css';
import '~/src/theme/css/tooltipUser.css';

import * as FontAwesome from 'react-icons/lib/fa';

import PropTypes from 'prop-types';


function ovelayContent(content, user) {
  return (
    <div>
      <div className="user-header">
        {/* {content} */}

        <div className="user-header-avatar">
          <img src="http://wpidiots.com/html/writic/red-writic-template/css/img/demo-images/avatar1.jpg" alt="user avatar" />
        </div>
        <div className="user-header-info">
          <h2 className="user-name">{`${user.firstName} ${user.lastName}`}</h2>
          <a className="user-socaial" href="#">@danielshen</a>
        </div>
        
      </div>
      <div className="user-action">
        <a className="item" href="#">
          <FontAwesome.FaUserPlus size={25} style={{ marginRight: "10px" }}/> 
          Add Friend
        </a>
        <a className="item" href="#">
          <FontAwesome.FaComments size={25} style={{ marginRight: "10px" }} /> 
          Send Message
        </a>
        <a className="item" href="#">
          <FontAwesome.FaUser size={25} style={{ marginRight: "10px" }} /> 
          View Full Profile
        </a>
      </div>
    </div>
  );
}

function TooltipForUser(props) {

  return (
    <Tooltip
      overlayClassName="tooltip-user"
      placement={"top"}
      mouseEnterDelay={0}
      mouseLeaveDelay={0.1}
      overlay={ovelayContent(props.overlayHtml, props.user)}
      transitionName={"animation"}
    >
      {props.children}
    </Tooltip>
  );

}

TooltipForUser.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired,
  overlayHtml: PropTypes.element
};

export default TooltipForUser;