import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ConfigMain from '~/configs/main';
import '../../css/connections.css';
import PropTypes from 'prop-types';
import LeftNav from '~/src/theme/components/homepage/LeftNav';
import Spinner from '~/src/theme/components/homepage/Spinner';
import RightSection from '~/src/theme/components/homepage/RightSection';
import ConnectionCard from './ConnectionCard';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';
function makeCall(url, currentUser, skip, data) {
  return Axios.get(url, {
    params: {
      currentUser,
      skip,
    },
  }).then(function(response) {
    if (response.data.length) {
      return makeCall(url, currentUser, skip + response.data.length, data.concat(response.data));
    } else {
      return data;
    }
  });
}
function fetchAllSoqqlers(currentUserId) {
  const allFrndUrl = `${ConfigMain.getBackendURL()}/getAllSoqqlers`;
  return new Promise((resolve, reject) => {
    makeCall(allFrndUrl, currentUserId, 0, []).then(resolve, reject);
  });
}
class Connections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabName: 'All',
      allFriendList: [],
      receivedList: [],
      sendList: [],
      friendList: [],
      facebookFriends: [],
      allTabLoading: false,
      otherTabLoading: false,
    };
    this.fetchAllConnections = this.fetchAllConnections.bind(this);
    this.fetchAllFriends = this.fetchAllFriends.bind(this);
    this.fetchFacebookFriends = this.fetchFacebookFriends.bind(this);
    this.handleAddSoqqler = this.handleAddSoqqler.bind(this);
    this.handleFriendRequest = this.handleFriendRequest.bind(this);
  }

  componentDidMount() {
    this.fetchAllConnections();
    this.fetchAllFriends();
    this.fetchFacebookFriends();
  }

  handleFriendRequest(user, action) {
    var that = this;
    const url = `${ConfigMain.getBackendURL()}/connectSoqqler`;
    Axios.post(url, {
      currentUser: that.props.userProfile,
      otherUser: user,
      connectAction: action,
    }).then(function(response) {
      if (response.data === 'success') {
        that.getAllFriends();
        that.getAllConnections();
      }
    }).catch(function(error) {
    });
  }

  handleAddSoqqler(userid) {
    var that = this;
    const url = `${ConfigMain.getBackendURL()}/addSoqqler`;
    Axios.post(url, {
      uid1: that.props.currentUserId,
      uid2: userid,
      reqStatus: 2,
    }).then(function(response) {        
      if (response.data === 'success') {
        that.setState(prevState => ({
          allFriendList: prevState.allFriendList.filter(el => el.id !== userid)
        }));
        that.getAllConnections();
      }
    })
    .catch(function(error) {
    });
  }

  fetchFacebookFriends() {
    if (!this.props.isAuthorized) return;
    const currentUserID = this.props.currentUserId;
    const facebookID =
    this.props.userProfile.facebook && this.props.userProfile.facebook._id
        ? this.props.userProfile.facebook._id
        : this.props.userProfile.facebookID;
    const that = this;
    const url = `${ConfigMain.getBackendURL()}/facebookFriendsForUserID`;
    Axios.get(url, {
      params: {
        currentUserID: currentUserID,
        facebookID: facebookID,
      },
    }).then(function(response) {
      that.setState({ facebookFriends: response.data.data });
    }).catch(function(error) {});
  }

  fetchAllFriends() {
    const that = this;
    this.setState({ allTabLoading: true });
    fetchAllSoqqlers(this.props.currentUserId)
      .then(function(data) {
        that.setState({ allTabLoading: false, allFriendList: data });
      }).catch(function(error) {
        this.setState({ allTabLoading: false });      
      });
  }

  fetchAllConnections() {
    const connectionsUrl = `${ConfigMain.getBackendURL()}/getConnectedSoqqlers`;
    var self = this;
    this.setState({ otherTabLoading: true });
    Axios.get(connectionsUrl, {
      params: {
        currentUser: self.props.currentUserId,
      },
    }).then(function(response) {
        self.setState({
          otherTabLoading: false,
          receivedList: response.data.filter(function(fList) {
            return fList.connectionStatus === 'Received';
          }),
          sentList: response.data.filter(function(fList) {
            return fList.connectionStatus === 'Sent';
          }),
          friendList: response.data.filter(function(fList) {
            return fList.connectionStatus === 'Friends';
          })
        });
    }).catch(function(error) { this.setState({ otherTabLoading: false }); });
  }

  renderAllTab() {
    if (this.state.allTabLoading) return <Spinner shown />;
    let allTabsData = this.state.allFriendList;
    const facebookFriends = this.state.facebookFriends;
    if (facebookFriends.length > 0) {
      allTabsData = this.state.allFriendList.map(function(friend) {
        return 
        Object.assign(
          {},
          friend, 
          { 
            isFacebookFriend: 
              facebookFriends.findIndex(fb => fb.id === friend.facebookID) !== -1 
          }
        );
      });
      // Show Facebook friends on top
      allTabsData.sort(function(friend1, friend2) {
        if (friend1.isFacebookFriend === friend2.isFacebookFriend) return 0;
        if (friend1.isFacebookFriend) return -1;
        return 1;
      });
    }

    return (
      <div className="connection-container">
        {allTabsData.map(connection => 
          <ConnectionCard
            key={connection.id}
            connection={connection}
            onPrimaryAction={() => this.handleAddSoqqler(connection.id)} 
          />)
        }
      </div>    
    );
  }

  renderConnectionsTab() {
    if (this.state.otherTabLoading) return <Spinner shown />;
    return (
      <div className="connection-container">
        {this.state.friendList.map(connection => 
          <ConnectionCard
            key={connection.id}
            connection={connection}
            actionName={friend.connectionStatus}
            onPrimaryAction={() => this.handleAddSoqqler(connection.id, friend.connectionStatus)} 
          />)
        }
      </div>
    );
  }

  renderReceivedTab() {
    if (this.state.otherTabLoading) return <Spinner shown />;
    return (
      <div className="connection-container">
        {this.state.receivedList.map(connection => 
          <ConnectionCard 
            key={connection.id}
            connection={connection} 
            actionName={'Accept'}
            onPrimaryAction={() => this.handleAddSoqqler(connection.id, 'Accept')}
            secondaryAction={'Reject'}
            onSecondaryAction={() => this.handleAddSoqqler(connection.id, 'Reject')}
          />)
        }
      </div>
    );
  }

  renderSentTab() {
    if (this.state.otherTabLoading) return <Spinner shown />;
    return (
      <div className="connection-container">
        {this.state.sendList.map(connection => 
          <ConnectionCard
            key={connection.id}
            connection={connection} 
            actionName={'Withdraw'}
            onPrimaryAction={() => this.handleAddSoqqler(connection.id, 'Withdraw')} 
          />)
        }
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
