import React from 'react';

const LeftPanel = () => {
  return(
    <div className="col fixed-wp rewards-leftpanel-holder">
      <div>
        <div className="rewards-leftpanel-header-text">Filter</div>
        <div className="rewards-leftpanel-drop-down-holder">
          <div className="rewards-leftpanel-drop-down-header">
            <div>COMPANY</div>
            <div>
              <i className="fa fa-caret-down"/>
            </div>
          </div>
          <div className="rewards-leftpanel-drop-down-list">

          </div>
        </div>
        <div className="rewards-leftpanel-drop-down-holder">
          <div className="rewards-leftpanel-drop-down-header">
            <div>TOKENS</div>
            <div>
              <i className="fa fa-caret-down"/>
            </div>
          </div>
          <div className="rewards-leftpanel-drop-down-list">

          </div>
        </div>
        <div className="rewards-leftpanel-drop-down-holder isOpen">
          <div className="rewards-leftpanel-drop-down-header">
            <div>CATEGORY</div>
            <div>
              <i className="fa fa-caret-up"/>
            </div>
          </div>
          <div className="rewards-leftpanel-drop-down-list">
            <div>Food</div>
            <div>Entertainment</div>
            <div>Study</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LeftPanel
