import {
    FETCH_ACHIEVEMENTS_INITIATE,
    FETCH_ACHIEVEMENTS_COMPLETE,
} from './actionTypes'

import Axios from 'axios'

import ConfigMain from '~/configs/main'


export function fetchAchievementsInitiate() {
    return {
        type: FETCH_ACHIEVEMENTS_INITIATE,
    }
}

export function fetchAchievementsComplete(data) {
    return {
        type: FETCH_ACHIEVEMENTS_COMPLETE,
        data: data,
    }
}

export function fetchAchievements() {
    return function (dispatch) {
      dispatch(fetchAchievementsInitiate());
      
      const url = `${ConfigMain.getBackendURL()}/achievement/group`;
        return (
        Axios.get(url)
        .then(function(response) {
            dispatch(fetchAchievementsComplete(response.data));
        })
        .catch(function(error) {
            dispatch(fetchAchievementsComplete([]));
        }));
    }
}