import React from 'react';

function ConnectionCard() {
  return (
    <div className="connection-card">
      <div className="connection-profile-pic">
        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-2.png" />
      </div>
      <div className="connection-info">
        <h1>David Ateyan</h1>
        <p>Innovation is widely known as a value which is worth pursuing</p>
      </div>
      <div className="connection-actions">
        <a href="#" className="btn-join">Add</a>
        <a href="#" className="btn-send">
          <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/send-arrow.png" alt="" />
        </a>
      </div>
      <ul className="connection-details">
        <li>
          <span>Friends</span>
          <div className="sql-badge">
            <a href="#">5</a>
          </div>
        </li>
        <li>
          <span>Progression Trees</span>
          <div className="sql-badge">
            <a href="#">5</a>
          </div>
        </li>
        <li>
          <span>Challenges</span>
          <div className="sql-badge">
            <a href="#">5</a>
          </div>
        </li>
        <li>
          <span>Tasks</span>
          <div className="sql-badge">
            <a href="#">5</a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ConnectionCard;