import React from "react";
import Axios from "axios";
import ConfigMain from "~/configs/main";
import "../theme/css/userList.css";
import {Tab, Tabs} from "../../node_modules/react-bootstrap";


class ConnectionsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Takes active tab from props if it is defined there
            allFriendList: [],
            friendList: [],
            receivedList: [],
            sentList: [],
            key: 1
        };
        this.handleSelect = this.handleSelect.bind(this);

    }

    getInitialState() {
        return {
            key: 1
        };
    }

    handleSelect(key) {
        this.setState({key});
    }

    componentWillMount() {
        this.getAllFriends();
        this.getAllConnections();
    }

    getAllFriends() {
        const allFrndUrl = `${ConfigMain.getBackendURL()}/getAllSoqqlers`;
        var self = this;
        Axios.get(allFrndUrl, {
            params: {
                currentUser: self.props.currentUserId
            }
        })
            .then(function (response) {
                self.setState({allFriendList : response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getAllConnections() {
        const connectionsUrl = `${ConfigMain.getBackendURL()}/getConnectedSoqqlers`;
        var self = this;
        Axios.get(connectionsUrl, {
            params: {
                currentUser: self.props.currentUserId
            }
        })
            .then(function (response) {
                self.setState({friendList: response.data});
                self.setState({
                    receivedList: self.state.friendList.filter(function (fList) {
                        return fList.connectionStatus === "Received";
                    })
                });
                self.setState({
                    sentList: self.state.friendList.filter(function (fList) {
                        return fList.connectionStatus === "Sent";
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * Handle friend request. action can be "Accept", "Reject" or "Withdraw"
     */
    handleFriendRequest(userid, action) {
        var self = this;

        const url = `${ConfigMain.getBackendURL()}/connectSoqqler`;
        Axios.post(url, {
            currentUser: self.props.currentUserId,
            otherUser: userid,
            connectAction: action
        })
            .then(function (response) {
                if (response.data === 'success') {
                    self.getAllConnections();
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleAddSoqqler(userid) {
        var self = this;
        const url = `${ConfigMain.getBackendURL()}/addSoqqler`;
        Axios.post(url, {
            uid1: self.props.currentUserId,
            uid2: userid,
            reqStatus: 2
        })
            .then(function (response) {
                if (response.data === 'success') {
                    self.getAllFriends();
                    self.getAllConnections();
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let divStyle = {overflow: 'auto'};
        return (
            <div style={divStyle} className="allFriendList">
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="allFriendList">
                    <Tab eventKey={1} title="All">
                        <ul> {
                            this.state.allFriendList.map(function (friend) {
                                let addBtn = <button type="button" className="btn btn-primary"
                                                     onClick={()=>this.handleAddSoqqler(friend.id)}>
                                    Add Soqqler</button>;
                                return (
                                    <li key={friend.id} className="borderStyle"> 
                                        <div className="imageContainer">                                  
                                            <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/annalisaicon.png"
                                            className="img-circle tmp"/>
                                        </div>
                                        <div className="friendInfoContainer">
                                            <div className="friendInfo">
                                                <span className="friendName">{friend.firstName} {friend.lastName}</span>
                                                <span className="friendDetails">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl sem</span>
                                            </div>
                                        </div>
                                        <div className="followersContainer">
                                            <span className="followersCount">1121</span>
                                            <span className="followersText">Friends</span>
                                        </div>
                                        <div className="followingContainer">
                                            <span className="followingCount">2230</span>
                                            <span className="followingText">Progression Trees</span>
                                        </div>
                                        <div className="photosContainer">
                                            <span className="photosCount">456</span>
                                            <span className="photosText">Projects</span>
                                        </div>
                                        <div className="videosContainer">
                                            <span className="videosCount">198</span>
                                            <span className="videosText">Tasks</span>
                                        </div>
                                        <div className="buttonContainer">
                                            <span className="actionBtn">{addBtn}</span>
                                        </div>
                                    </li>);                                        
                            }, this)}
                        </ul>
                    </Tab>
                    <Tab eventKey={2} title="Connections">
                        <ul> {

                            this.state.friendList.map(function (friend) {
                                const reqState = friend.connectionStatus;
                                let button = null;
                                let mainbtn = <span>
                                    <button type="button" className="btn btn-success"
                                            onClick={()=>this.handleFriendRequest(friend.id, 'Accept')}> Accept
                                    </button>
                                    &nbsp;&nbsp;
                                    <button type="button" className="btn btn-warning"
                                            onClick={()=>this.handleFriendRequest(friend.id, 'Reject')}>Reject
                                    </button>
                                </span>;

                                if (reqState == "Received") {
                                    button = mainbtn;
                                } else if (reqState == "Sent") {
                                    button = <button type="button" className="btn btn-primary"
                                                     onClick={()=>this.handleFriendRequest(friend.id, 'Withdraw')}>
                                        Withdraw</button>;
                                } else {
                                    button = <button type="button" className="btn btn-primary"
                                                     onClick={()=>this.handleFriendRequest(friend.id, reqState)}>{reqState}</button>;
                                }
                                return (
                                    <li key={friend.id} className="borderStyle">
                                        <div className="imageContainer">                                  
                                            <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/annalisaicon.png"
                                            className="img-circle tmp"/>
                                        </div>
                                        <div className="friendInfoContainer">
                                            <div className="friendInfo">
                                                <span className="friendName">{friend.firstName} {friend.lastName}</span>
                                                <span className="friendDetails">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl sem</span>
                                            </div>
                                        </div>
                                        <div className="followersContainer">
                                            <span className="followersCount">1121</span>
                                            <span className="followersText">Friends</span>
                                        </div>
                                        <div className="followingContainer">
                                            <span className="followingCount">2230</span>
                                            <span className="followingText">Progression Trees</span>
                                        </div>
                                        <div className="photosContainer">
                                            <span className="photosCount">456</span>
                                            <span className="photosText">Projects</span>
                                        </div>
                                        <div className="videosContainer">
                                            <span className="videosCount">198</span>
                                            <span className="videosText">Tasks</span>
                                        </div>
                                        <div className="buttonContainer">
                                            <span className="actionBtn">{button}</span>
                                        </div>
                                    </li>);
                            }, this)}
                        </ul>
                    </Tab>
                    <Tab eventKey={3} title="Received">
                        <ul> {
                            this.state.receivedList.map(function (friend) {
                                let actionBtn = <span ><button type="button" className="btn btn-success"
                                                               onClick={()=>this.handleFriendRequest(friend.id, 'Accept')}> Accept</button>
                                    &nbsp;&nbsp;
                                    <button type="button" className="btn btn-warning"
                                            onClick={()=>this.handleFriendRequest(friend.id, 'Reject')}>Reject</button> </span>;
                                return (
                                    <li key={friend.id} className="borderStyle">
                                        <div className="imageContainer">                                  
                                            <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/annalisaicon.png"
                                            className="img-circle tmp"/>
                                        </div>
                                        <div className="friendInfoContainer">
                                            <div className="friendInfo">
                                                <span className="friendName">{friend.firstName} {friend.lastName}</span>
                                                <span className="friendDetails">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl sem</span>
                                            </div>
                                        </div>
                                        <div className="followersContainer">
                                            <span className="followersCount">1121</span>
                                            <span className="followersText">Friends</span>
                                        </div>
                                        <div className="followingContainer">
                                            <span className="followingCount">2230</span>
                                            <span className="followingText">Progression Trees</span>
                                        </div>
                                        <div className="photosContainer">
                                            <span className="photosCount">456</span>
                                            <span className="photosText">Projects</span>
                                        </div>
                                        <div className="videosContainer">
                                            <span className="videosCount">198</span>
                                            <span className="videosText">Tasks</span>
                                        </div>
                                        <div className="buttonContainer">
                                            <span className="actionBtn">{actionBtn}</span>
                                        </div>
                                    </li>);
                            }, this)}
                        </ul>
                    </Tab>
                    <Tab eventKey={4} title="Sent">
                        <ul> {
                            this.state.sentList.map(function (friend) {
                                let button = null;
                                let withdrawBtn = <button type="button" className="btn btn-primary"
                                                          onClick={()=>this.handleFriendRequest(friend.id, 'Withdraw')}>
                                    Withdraw</button>;
                                return (
                                    <li key={friend.id} className="borderStyle">
                                        <div className="imageContainer">                                  
                                            <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/annalisaicon.png"
                                            className="img-circle tmp"/>
                                        </div>
                                        <div className="friendInfoContainer">
                                            <div className="friendInfo">
                                                <span className="friendName">{friend.firstName} {friend.lastName}</span>
                                                <span className="friendDetails">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl sem</span>
                                            </div>
                                        </div>
                                        <div className="followersContainer">
                                            <span className="followersCount">1121</span>
                                            <span className="followersText">Friends</span>
                                        </div>
                                        <div className="followingContainer">
                                            <span className="followingCount">2230</span>
                                            <span className="followingText">Progression Trees</span>
                                        </div>
                                        <div className="photosContainer">
                                            <span className="photosCount">456</span>
                                            <span className="photosText">Projects</span>
                                        </div>
                                        <div className="videosContainer">
                                            <span className="videosCount">198</span>
                                            <span className="videosText">Tasks</span>
                                        </div>
                                        <div className="buttonContainer">
                                            <span className="actionBtn">{withdrawBtn}</span>
                                        </div>
                                    </li>);
                            }, this)}
                        </ul>
                    </Tab>

                </Tabs>
            </div>
        );
    }

}

export default ConnectionsView;