/*
    author: Alexander Zolotov
*/
import React, { Component } from 'react';
import {Icon} from 'react-fa'
import ActionLink from '~/src/components/common/ActionLink'

import {ProgressBar} from 'react-bootstrap'

const NAV_TAB_ID_TREND_SCANNER = "nav_tab_id_trend_scanner";
const NAV_TAB_ID_DEVELOPMENT_ROADMAPS = "nav_tab_id_development_roadmaps";
const NAV_TAB_ID_TASK_MANAGER = "nav_tab_id_task_manager";
const NAV_TAB_ID_PROJECT_MANAGER = "nav_id_project_manager";

const NAV_TABS = [NAV_TAB_ID_TREND_SCANNER, NAV_TAB_ID_DEVELOPMENT_ROADMAPS, NAV_TAB_ID_TASK_MANAGER, NAV_TAB_ID_PROJECT_MANAGER];

class HowItWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      currentTab: NAV_TAB_ID_TREND_SCANNER,
    }
  }

  componentWillMount() {
    let foundTabIndex = NAV_TABS.indexOf(this.state.currentTab);
    let newProgressValue = (foundTabIndex != -1) ? (foundTabIndex + 1) * (100 / NAV_TABS.length) : 0;
    let copy = Object.assign({}, this.state, {progressValue: newProgressValue});
    this.setState(copy);
  }

  handleSelectCategory(e) {

    if (e.currentTarget.id) {

      let newTabSelection = e.currentTarget.id;

      let foundTabIndex = NAV_TABS.indexOf(newTabSelection);

      let newProgressValue = (foundTabIndex != -1) ? (foundTabIndex + 1) * (100 / NAV_TABS.length) : 0;

      let copy = Object.assign({}, this.state, {currentTab: newTabSelection, progressValue: newProgressValue});
      this.setState(copy);
    }
  }

  renderNavigationTabs() {
    const tab1ClassName = this.state.currentTab == NAV_TABS[0] ? "active" : "";
    const tab2ClassName = this.state.currentTab == NAV_TABS[1] ? "active" : "";
    const tab3ClassName = this.state.currentTab == NAV_TABS[2] ? "active" : "";
    const tab4ClassName = this.state.currentTab == NAV_TABS[3] ? "active" : "";

    return (
      <div className="tabpanel styled-tabs uniform-height" role="tabpanel">
      <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className={tab1ClassName}>
            <ActionLink href="#tabs-tab1" aria-controls="tabs-tab1" role="tab" 
              data-toggle="tab" id={NAV_TAB_ID_TREND_SCANNER} onClick={(e) => this.handleSelectCategory(e)}>
                 <Icon className="icon" name="diamond"/><span>Trend Scanner</span>
            </ActionLink>
          </li>
          <li role="presentation" className={tab2ClassName}>
            <ActionLink href="#tabs-tab2" aria-controls="tabs-tab2" role="tab" 
              data-toggle="tab" id={NAV_TAB_ID_DEVELOPMENT_ROADMAPS} onClick={(e) => this.handleSelectCategory(e)}>
                 <Icon className="icon" name="train"/><span>Development Roadmaps</span>
            </ActionLink>
          </li>
          <li role="presentation" className={tab3ClassName}>
            <ActionLink href="#tabs-tab3" aria-controls="tabs-tab3" role="tab" 
              data-toggle="tab" id={NAV_TAB_ID_TASK_MANAGER} onClick={(e) => this.handleSelectCategory(e)}>
                 <Icon className="icon" name="coffee"/><span>Task Manager</span>
            </ActionLink>
          </li>
          <li role="presentation" className={tab4ClassName}>
            <ActionLink href="#tabs-tab3" aria-controls="tabs-tab3" role="tab" 
              data-toggle="tab" id={NAV_TAB_ID_PROJECT_MANAGER} onClick={(e) => this.handleSelectCategory(e)}>
                 <Icon className="icon" name="comment"/><span>Project Manager</span>
            </ActionLink>
          </li>
      </ul>
      </div>);
  }

  render() {
    return (<div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
      {this.renderNavigationTabs()}
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12">
      <ProgressBar now={this.state.progressValue}/>
      </div>
   </div>
    </div>);
  }
}

export default HowItWorks;