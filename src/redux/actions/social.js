import ConfigMain from '~/configs/main'

let DataProviderIndeed = require("~/src/data_providers/indeed/DataProvider");
let DataProviderEventBrite = require("~/src/data_providers/event_brite/DataProvider");
let DataProviderUdemy = require("~/src/data_providers/udemy/DataProvider");
let DataProviderFreelancer = require("~/src/data_providers/freelancer/DataProvider");

import {
    FETCH_USER_FRIENDS_INITIATE,
    FETCH_USER_FRIENDS_COMPLETE,

} from './actionTypes';

export function fetchUserFriendsInitiate() {
    return {
        type: FETCH_USER_FRIENDS_INITIATE,
    }
}

export function fetchUserFriendsComplete(fetchResults) {
    return {
        type: FETCH_USER_FRIENDS_COMPLETE,
        friends: fetchResults
    }
}

export function fetchUserFriends(userId) {
    console.log("fetchUserFriends userId: " + userId);
    return function (dispatch) {
        dispatch(fetchUserFriendsInitiate());
        
        const url = `${ConfigMain.getBackendURL()}getUserFriends?id=${userId}`;
          return (
          Axios.get(url)
          .then(function(response) {
              dispatch(fetchUserFriendsComplete(response.data));
          })
          .catch(function(error) {
              dispatch(fetchUserFriendsComplete([]));
          }));
      }
}