import React from "react";
import Axios from "axios";
import "../theme_new/css/userList.css";

let friendList = [];

class ConnectionsView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const url = `${ConfigMain.getBackendURL()}/getConnectedSoqqlers`;

        Axios.get(url)
            .then(function (response) {
                friendList = response.data;
                console.log(friendList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * Handle friend request. action can be "Accept", "Reject" or "Withdraw"
     */
    handleFriendRequest(userid, action) {
        Axios.post('/user', {
            currentUser: '5a2b5b827974e720efe0f923',
            otherUser: userid,
            connectAction: action
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        return (
            <div id="main-content_1">


                <div id="exTab3">
                    <ul className="nav nav-pills">
                        <li className="active">
                            <a href="#1b" data-toggle="tab"> All</a>
                        </li>
                        <li>
                            <a href="#2b" data-toggle="tab"> Received</a>
                        </li>
                        <li>
                            <a href="#3b" data-toggle="tab"> Sent</a>
                        </li>
                    </ul>
                    <div className="tab-content clearfix">
                        <div className="tab-pane active" id="1b">
                            <div>
                                <ul>
                                    {
                                        friendList.map(function (friend, id) {
                                            const reqState = friend.connectionStatus;
                                            let button = null;
                                            if (reqState == "Received") {
                                                button = [
                                                    <button type="button" className="btn btn-success">Accept</button> ,
                                                     " ",
                                                    <button type="button" className="btn btn-warning">Reject</button>
                                                ];
                                            } else if(reqState == "Sent"){
                                                button = <button type="button" className="btn btn-primary"> Withdraw</button>;
                                            }
                                            else {
                                                button = <button type="button" className="btn btn-primary">{reqState}</button>;
                                            }
                                            return (<li key={friend.id} className="borderStyle">
                                                <img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/dummy_friend_image.png"
                                                    className="img-circle tmp"/>
                                                <h3>{friend.firstName} {friend.lastName}</h3>
                                            <span className="actionBtn">
                                                {button}
                                            </span>
                                            </li>);
                                        })
                                    }
                                </ul>
                            </div>

                        </div>
                        <div className="tab-pane" id="2b">
                            <h3>Show received request</h3>
                        </div>
                        <div className="tab-pane" id="3b">
                            <h3>Show sent request</h3>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default ConnectionsView;
