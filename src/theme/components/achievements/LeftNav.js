import React from 'react';

const LeftNav = (props) => {
  return (
    <div className="col fixed-wp achievements-left-wp">
      <div className="col-box-wp p-0">
        <div className="left-content">
          <div className="top-head">
            <div className="icon">
              <img src={props.profilePic} alt="" />
            </div>
            <span className="col-heading">{props.userProfile.firstName} {props.userProfile.lastName}</span>
          </div>
          <ul className="achievements-left-wap-links">
            <li>
              <a href="#">
                <p>All</p>
              </a>
            </li>
            <li>
              <a href="#">
                <p>General</p>
              </a>
            </li>
            <li className="active">
              <a href="#">
                <p>House</p>
              </a>
            </li>
            <li>
              <a href="#">
                <p>Hero</p>
              </a>
            </li>
            <li>
              <a href="#">
                <p>Zara</p>
              </a>
            </li>
            <li>
              <a href="#">
                <p>Mango</p>
              </a>
            </li>
            <li>
              <a href="#">
                <p>Apple</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
