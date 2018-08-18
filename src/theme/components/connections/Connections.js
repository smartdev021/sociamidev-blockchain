import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ConfigMain from '~/configs/main';
import '../../css/connections.css';
import PropTypes from 'prop-types';
import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import ConnectionCard from './ConnectionCard';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';
class Connections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabName: 'All',
    };
  }

  renderAllTab() {
    return (
      <div className="connection-container">
        {[1,2,3,4,5,6,7,8,9,10].map(friend => <ConnectionCard />)}
      </div>    
    );
  }

  renderConnectionsTab() {
    return (
      <div className="connection-container">
        {[1,2].map(friend => <ConnectionCard />)}
      </div>
    );
  }

  renderReceivedTab() {
    return (
      <div className="connection-container">
        {[1].map(friend => <ConnectionCard />)}
      </div>
    );
  }

  renderSentTab() {
    return (
      <div className="connection-container">
        {[1,2,3,4].map(friend => <ConnectionCard />)}
      </div>
    );
  }

  renderMiddle() {
    return (
      <div>  
        <div className="col-box-wp mb-20 p-0" style={{ float: 'none' }}>
          <ul className="tab-wp">
            <li className={this.state.activeTabName === 'All' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'All' })}>All</a>
            </li>
            <li className={this.state.activeTabName === 'Connections' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'Connections' })}>Connections</a>
            </li>
            <li className={this.state.activeTabName === 'Sent' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'Sent' })}>Sent</a>
            </li>
            <li className={this.state.activeTabName === 'Received' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'Received' })}>Received</a>
            </li>
          </ul>
        </div>
        <div>
          <div style={{ display: this.state.activeTabName === 'All' }}>
            {this.state.activeTabName === 'All' && this.renderAllTab()}
          </div>
          <div style={{ display: this.state.activeTabName === 'Connections' }}>
            {this.state.activeTabName === 'Connections' && this.renderConnectionsTab()}
          </div>
          <div style={{ display: this.state.activeTabName === 'Sent' }}>
            {this.state.activeTabName === 'Sent' && this.renderSentTab()}
          </div>
          <div style={{ display: this.state.activeTabName === 'Received' }}>
            {this.state.activeTabName === 'Received' && this.renderReceivedTab()}
          </div>
        </div>
      </div >
    );
  }

  render() {
    return (
      <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper settings-wrapper main-bg`}>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                <LeftNav accounting={this.props.accounting}
                  userProfile={this.props.userProfile}
                  profilePic={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic}
                />
                <RightSection />
                <div className="col-middle ml-fixed">
                  {this.renderMiddle()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Connections.propTypes = {
  userProfile: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export default Connections;
