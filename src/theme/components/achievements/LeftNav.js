import React from 'react';

const LeftNav = (props) => {
  return (
    <div className="col fixed-wp">
      <div className="col-box-wp p-0">
        <div className="left-content">
          <div className="top-head">
            <div className="icon">
              <img src={props.profilePic} alt="" />
            </div>
            <span className="col-heading">{props.userProfile.firstName} {props.userProfile.lastName}</span>
          </div>
          <ul>
            <li>
              <a href="#">
                <span className="icon-wp">
                  <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/newsfeed-menu-icon.png" />
                </span>
                <p>News Feed</p>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon-wp">
                  <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/messages-menu-icon.png" />
                </span>
                <p>Messages</p>
              </a>
            </li>
            <div className="line-devider"></div>
            <li>
              <a href="#">
                <span className="icon-wp">
                  <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/team-menu-icon.png" />
                </span>
                <p>Team</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
