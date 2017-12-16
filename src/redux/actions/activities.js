import Axios from 'axios'

import ConfigMain from '~/configs/main'

import {
    PUSH_NEW_ACTIVITY,
} from './actionTypes';

export function pushNewActivity(activity) {
    return function (dispatch) {
      const url = `${ConfigMain.getBackendURL()}/userActivityAdd`;
        return (
        Axios.post(url, activity)
        .then(function(response) {
        })
        .catch(function(error) {
        }));
    }
}