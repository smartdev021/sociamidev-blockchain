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

    getAllFriends(){
        const allFrndUrl = `${ConfigMain.getBackendURL()}/getAllSoqqlers`;
        var self = this;
        Axios.get(allFrndUrl)
            .then(function (response) {
                self.state.allFriendList = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getAllConnections(){
        const connectionsUrl = `${ConfigMain.getBackendURL()}/getConnectedSoqqlers`;
        var self = this;
        Axios.get(connectionsUrl)
            .then(function (response) {
                self.state.friendList = response.data;
                self.state.receivedList = self.state.friendList.filter(function (fList) {
                    return fList.connectionStatus === "Received";
                });
                self.state.sentList = self.state.friendList.filter(function (fList) {
                    return fList.connectionStatus === "Sent";
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
            currentUser: '5a2b5b827974e720efe0f923',
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
            currentUser: '5a2b5b827974e720efe0f923',
            otherUser: userid
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
            <div id="main-content_1" style={divStyle}>
                <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="allFriendList">
                    <Tab eventKey={1} title="All">
                        <ul> {
                            this.state.allFriendList.map(function (friend) {
                                let addBtn = <button type="button" className="btn btn-primary"
                                                     onClick={()=>this.handleAddSoqqler(friend.id)}>
                                    Add Soqqler</button>;
                                return (
                                    <li key={friend.id} className="borderStyle">
                                        <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/dummy_friend_image.png"
                                            className="img-circle tmp"/>
                                        <h3>{friend.firstName} {friend.lastName}</h3>
                                        <span className="actionBtn">  {addBtn} </span></li>);
                            }, this)}
                        </ul>
                    </Tab>
                    <Tab eventKey={2} title="Connections">
                        <ul> {

                            this.state.friendList.map(function (friend) {
                                const reqState = friend.connectionStatus;
                                let button = null;
                                let mainbtn = <div>
                                    <button type="button" className="btn btn-success"
                                            onClick={()=>this.handleFriendRequest(friend.id, 'Accept')}> Accept
                                    </button>
                                    &nbsp;&nbsp;
                                    <button type="button" className="btn btn-warning"
                                            onClick={()=>this.handleFriendRequest(friend.id, 'Reject')}>Reject
                                    </button>
                                </div>;

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
                                        <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/dummy_friend_image.png"
                                            className="img-circle tmp"/>
                                        <h3>{friend.firstName} {friend.lastName}</h3>
                                        <span className="actionBtn">  {button} </span></li>);
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
                                        <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/dummy_friend_image.png"
                                            className="img-circle tmp"/>
                                        <h3>{friend.firstName} {friend.lastName}</h3>
                                        <span className="actionBtn">  {actionBtn} </span></li>);
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
                                        <img
                                            src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/dummy_friend_image.png"
                                            className="img-circle tmp"/>
                                        <h3>{friend.firstName} {friend.lastName}</h3>
                                        <span className="actionBtn">  {withdrawBtn} </span></li>);
                            }, this)}
                        </ul>
                    </Tab>

                </Tabs>
            </div>
        );
    }

}

export default ConnectionsView;