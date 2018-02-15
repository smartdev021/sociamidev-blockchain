/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import {Icon} from 'react-fa'

import ThemeHeader from '~/src/new-ui-rin/ThemeHeader';
import SidebarLeft from '~/src/new-ui-rin/SidebarLeft';
import TaskManager from '~/src/new-ui-rin/TaskManager';

//routes
import Authorize from '~/src/authentication/Authorize';

import HomePage from '~/src/theme/HomePage.js';
import TrendScanner from '~/src/theme/TrendScanner.js';
import TaskManagement from '~/src/theme/TaskManagement';
import ProjectManager from '~/src/theme/ProjectManagement';
import ProjectBrowser from '~/src/theme/ProjectBrowser';
import TaskBrowser from '~/src/theme/components/tasks/TaskBrowser'
import ProgressionTreeBrowser from '~/src/theme/ProgressionTreeBrowser';
import ProgressionTrees from '~/src/theme/ProgressionTrees';
import About from '~/src/theme/About.js';
import ICO from '~/src/theme/ICO.js';
import ConnectionsView from '~/src/theme/ConnectionsView.js';
import "~/src/theme/css/main.css";
import UserProfile from '~/src/theme/UserProfile.js';

import Privacy from '~/src/theme/Privacy.js';

import {
    fetchAllTasks
  } from '~/src/redux/actions/tasks'

import '~/src/style.css'

class MainNew extends React.Component {
    getRedirectLocation() {
        let RedirectTo = null;
        if (this.props.isOpenSearchResultsPending) {
          if (this.props.location.pathname != '/searchResults') {
            RedirectTo = <Redirect to="/searchResults" push />;
          }
        }
        else if (this.props.isOpenProfilePending) {
          if (this.props.location.pathname != '/userProfile') {
            RedirectTo = <Redirect to="/userProfile" push />;
          }
        }
    
        console.log("RedirectTo: " + RedirectTo);
    
        return RedirectTo;
      }

    renderRoutes() {
        return (
          <Switch>
            <Route exact path='/' render={routeProps => <HomePage {...routeProps}{...this.props}/>} />
            <Route exact path='/progressionTrees' render={routeProps => <ProgressionTrees {...routeProps}{...this.props}/>} />
            <Route path='/taskManagement' render={routeProps => <TaskManager {...routeProps}{...this.props}/>}/>
            <Route path='/projectManagement' render={routeProps => <ProjectManager {...routeProps}{...this.props}/>}/>
            <Route path='/projectBrowser' render={routeProps => <ProjectBrowser {...routeProps}{...this.props}/>}/>
            <Route exact path='/connectionsView' render={routeProps => <ConnectionsView {...routeProps}{...this.props}/>} />
          </Switch>)
      }

    render() {
      const RedirectTo = this.getRedirectLocation();
      return (
        <div className="wrapper">
          {RedirectTo}
          <ThemeHeader isAuthorized={this.props.isAuthorized} userActivities={this.props.userActivities} 
            fetchUserActivities={() => this.props.fetchUserActivities()}/>
          <div className="session-content">
            <SidebarLeft />
            <div className="content-tokens">
              {this.renderRoutes()}
            </div>
          </div>
        </div>
      );
    }
}

MainNew.propTypes = {
    onFetchAllTasks: PropTypes.func.isRequired,
    userActivities: PropTypes.array.isRequired,
  }

  const mapDispatchToProps = dispatch => ({
    onFetchAllTasks: bindActionCreators(fetchAllTasks, dispatch),
  });
  
  const mapStateToProps = state => ({
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNew));
