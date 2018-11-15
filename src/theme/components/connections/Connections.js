import React from 'react';
import Axios from 'axios';
import ConfigMain from '~/configs/main';
import '../../css/connections.css';
import PropTypes from 'prop-types';
import LeftNav from '~/src/theme/components/homepage/LeftNav';
import Spinner from '~/src/theme/components/homepage/Spinner';
import RightSection from '~/src/theme/components/homepage/RightSection';
import ConnectionCard from './ConnectionCard';
import ScrollHandle from './ScrollHandle';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';
class Connections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabName: 'All',
      sourceAllFriends: [],
      allFriendList: [],
      sourceReceived: [],
      receivedList: [],
      sourceSent: [],
      sentList: [],
      sourceFriend: [],
      friendList: [],
      facebookFriends: [],
      allTabLoading: false,
      otherTabLoading: false,
      skip: 0,
      searchValue: '',
      moreSoqqlersToFetch: true,
    };
    this.fetchAllConnections = this.fetchAllConnections.bind(this);
    this.fetchMoreSoqqlers = this.fetchMoreSoqqlers.bind(this);
    this.fetchFacebookFriends = this.fetchFacebookFriends.bind(this);
    this.handleAddSoqqler = this.handleAddSoqqler.bind(this);
    this.handleFriendRequest = this.handleFriendRequest.bind(this);
  }

  componentDidMount() {
    this.fetchAllConnections();
    this.fetchMoreSoqqlers();
    this.fetchFacebookFriends();       
    this.searchByEnter(); 
  }

  searchByEnter(){
    document.addEventListener('keydown', (e) => {
        if(e.keyCode == 13) {
          this.searchConnection(this.state.activeTabName);
        }
     })
  }

  handleFriendRequest(user, action) {
    var that = this;
    const url = `${ConfigMain.getBackendURL()}/connectSoqqler`;
    this.setState({ otherTabLoading: true });
    Axios.post(url, {
      currentUser: that.props.userProfile,
      otherUser: user,
      connectAction: action,
    }).then(function(response) {
      that.setState({ otherTabLoading: false });
      if (response.data === 'success') {
        that.fetchMoreSoqqlers(true);
        that.fetchAllConnections();
      }
    }).catch(function(error) {
      that.setState({ otherTabLoading: false });
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
          allFriendList: prevState.allFriendList.filter(el => el.id !== userid),
          sourceAllFriends: prevState.allFriendList.filter(el => el.id !== userid)
        }));
        that.fetchAllConnections();
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

  fetchMoreSoqqlers(reset) {
    if(!reset && (!this.state.moreSoqqlersToFetch || this.state.allTabLoading)) return;
    const that = this;
    this.setState({ allTabLoading: true });
    const allFrndUrl = `${ConfigMain.getBackendURL()}/getAllSoqqlers`;
    const prevSkip = reset ? 0 : this.state.skip;
    const prevSoqList = reset ? [] : this.state.allFriendList;
    Axios.get(allFrndUrl, {
      params: {
        currentUser: this.props.currentUserId,
        skip: prevSkip,
      },
    }).then(function(response) {
      if (response.data.length) {
        that.setState({
          allTabLoading: false,
          moreSoqqlersToFetch: true,
          skip: prevSkip + response.data.length,
          allFriendList: prevSoqList.concat(response.data),
          sourceAllFriends: prevSoqList.concat(response.data)
        });
      } else {
        that.setState({ moreSoqqlersToFetch: false, allTabLoading: false });
      }
    }).catch(function(error) {
      that.setState({ allTabLoading: false });      
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
      const receivedList = response.data.filter(function(fList) {
        return fList.connectionStatus === 'Received';
      });
      const sentList = response.data.filter(function(fList) {
        return fList.connectionStatus === 'Sent';
      });
      const friendList = response.data.filter(function(fList) {
        return fList.connectionStatus === 'Friends';
      });
      self.setState({
        otherTabLoading: false,
        sourceReceived: receivedList,
        receivedList,
        sourceSent: sentList,
        sentList,
        sourceFriend: friendList,
        friendList
      });
    }).catch(function(error) { self.setState({ otherTabLoading: false }); });
  }

  navigateToUserProfile(id) {
    return this.props.history.push(`/userprofile?id=${id}`);
  }

  renderAllTab() {
    const _that = this;
    let allTabsData = this.state.allFriendList;
    const facebookFriends = this.state.facebookFriends;

    if (facebookFriends.length > 0) {
      allTabsData = this.state.allFriendList.map(function(friend) {
        let friendData = Object.assign({},friend,{ isFacebookFriend: facebookFriends.findIndex(fb => fb.id === friend.facebookID) !== -1 })
        return friendData;
        ;
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
            onClickCheckUserProfile={_that.navigateToUserProfile.bind(_that, connection.id)}
            connection={connection}
            onPrimaryAction={() => this.handleAddSoqqler(connection.id)}
          />)
        }
      </div>
    );
  }

  renderConnectionsTab() {
    const _that = this;
    if (this.state.otherTabLoading) return <Spinner shown />;
    return (
      <div className="connection-container">
        {this.state.friendList.map(connection =>
          <ConnectionCard
            key={connection.id}
            onClickCheckUserProfile={_that.navigateToUserProfile.bind(_that, connection.id)}
            connection={connection}
            actionName={'Withdraw'}
            onPrimaryAction={() => this.handleFriendRequest(connection, 'Withdraw')}
          />)
        }
      </div>
    );
  }

  renderReceivedTab() {
    const _that = this;
    if (this.state.otherTabLoading) return <Spinner shown />;
    return (
      <div className="connection-container">
        {this.state.receivedList.map(connection =>
          <ConnectionCard
            key={connection.id}
            onClickCheckUserProfile={_that.navigateToUserProfile.bind(_that, connection.id)}
            connection={connection}
            actionName={'Accept'}
            onPrimaryAction={() => this.handleFriendRequest(connection, 'Accept')}
            secondaryAction={'Reject'}
            onSecondaryAction={() => this.handleFriendRequest(connection, 'Reject')}
          />)
        }
      </div>
    );
  }

  renderSentTab() {
    const _that = this;
    if (this.state.otherTabLoading) return <Spinner shown />;
    return (
      <div className="connection-container">
        {this.state.sentList.map(connection =>
          <ConnectionCard
            key={connection.id}
            onClickCheckUserProfile={_that.navigateToUserProfile.bind(_that, connection.id)}
            connection={connection}
            actionName={'Withdraw'}
            onPrimaryAction={() => this.handleFriendRequest(connection, 'Withdraw')}
          />)
        }
      </div>
    );
  }

  handleSearchChange(e){
    this.setState({searchValue: e.target.value});
  }

  handleSubmit(e, activeTab){
    this.searchConnection(activeTab);
  }

  renderMiddle() {
    return (
      <div>  
        <div className="col-box-wp mb-20 p-0" style={{ float: 'none' }}>
          <ul className="tab-wp">
            <li className={this.state.activeTabName === 'All' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'All', allFriendList: this.state.sourceAllFriends })}>All</a>
            </li>
            <li className={this.state.activeTabName === 'Connections' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'Connections', friendList: this.state.sourceFriend })}>Connections</a>
            </li>
            <li className={this.state.activeTabName === 'Sent' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'Sent', sentList: this.state.sourceSent })}>Sent</a>
            </li>
            <li className={this.state.activeTabName === 'Received' ? 'active' : ''}>
              <a href="javascript:;" onClick={() => this.setState({ activeTabName: 'Received', receivedList: this.state.sourceReceived })}>Received</a>
            </li>
            <div className="friends-search-container">
              <input type="text" placeholder="SEARCH.." name="search" onChange={this.handleSearchChange.bind(this)} />
              <button type="submit" onClick={(e) => this.handleSubmit(e, this.state.activeTabName)}>
                <i className="fa fa-search" style={{color: "#9601a3"}} ></i>
              </button>
            </div>
          </ul>
        </div>
        <div>
          <div style={{ display: this.state.activeTabName === 'All' ? 'block' : 'none' }}>
            {this.state.activeTabName === 'All' && this.renderAllTab()}
            <ScrollHandle 
              progress={this.state.allTabLoading}
              active={this.state.moreSoqqlersToFetch && this.state.activeTabName === 'All' && !this.state.searchValue}
              onActive={this.fetchMoreSoqqlers}/>
          </div>
          <div style={{ display: this.state.activeTabName === 'Connections' ? 'block' : 'none' }}>
            {this.state.activeTabName === 'Connections' && this.renderConnectionsTab()}
          </div>
          <div style={{ display: this.state.activeTabName === 'Sent' ? 'block' : 'none' }}>
            {this.state.activeTabName === 'Sent' && this.renderSentTab()}
          </div>
          <div style={{ display: this.state.activeTabName === 'Received' ? 'block' : 'none' }}>
            {this.state.activeTabName === 'Received' && this.renderReceivedTab()}
          </div>
        </div>
      </div>
    );
  }

  searchConnection(activeTab){
     let searchResult = [];
     if(activeTab == 'All'){
        const searchUrl = `${ConfigMain.getBackendURL()}/searchSoqqlers`;
       
        if(this.state.searchValue){
          this.setState({ 
            allTabLoading: true, 
            allFriendList: []
          });
          Axios.get(searchUrl, {
            params: {
              currentUser: this.props.currentUserId,
              searchValue: this.state.searchValue,
            },
          }).then(response => {
            if (response.data.length > 0) {
              this.setState({
                allTabLoading: false,
                allFriendList: response.data,
              });
            } else {
              this.setState({ allTabLoading: false });
            }
          }).catch(error => {
            this.setState({ allTabLoading: false });      
          });
        } else {
           this.setState({
              allFriendList: this.state.sourceAllFriends,
              searchValue: ''
           })
        }

     } else if (activeTab == 'Connections'){
         searchResult = this.state.sourceFriend.filter(connection => this.searchCondition(connection, this.state.searchValue));
         this.setState({ friendList: searchResult })

     } else if (activeTab == 'Sent'){
         searchResult = this.state.sourceSent.filter(connection => this.searchCondition(connection, this.state.searchValue));
         this.setState({ sentList: searchResult })

      } else if (activeTab == 'Received'){
         searchResult = this.state.sourceReceived.filter(connection =>  this.searchCondition(connection, this.state.searchValue))
         this.setState({ receivedList: searchResult })
    }
  }

  searchCondition(sourceVal, searchVal){
    return sourceVal.firstName && sourceVal.firstName.toLowerCase().indexOf(searchVal.toLowerCase()) != -1 || 
    sourceVal.lastName && sourceVal.lastName.toLowerCase().indexOf(searchVal.toLowerCase()) != -1 || searchVal == '';
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
                <RightSection
                  skills={this.props.skills}
                  roadmapsAdmin={this.props.roadmapsAdmin}
                  userProfile={this.props.userProfile}
                />
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
