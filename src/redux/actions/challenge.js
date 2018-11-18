import { DELETE_SKILLS_INITIATE, DELETE_SKILLS_COMPLETE, SAVE_SKILLS_INITIATE, SAVE_SKILLS_COMPLETE, FETCH_SKILLS_INITIATE, FETCH_SKILLS_COMPLETE, UPDATE_SKILLS_INITIATE, UPDATE_SKILLS_COMPLETE } from './actionTypes';

import Axios from 'axios';
import ConfigMain from '~/configs/main';

export function saveChallengesInitiate () {
  return {
    type: SAVE_SKILLS_INITIATE,
    skills: []
  };
}

export function saveChallengesComplete (data) {
  return {
    type: SAVE_SKILLS_COMPLETE,
    skills: data
  };
}

export function fetchChallengesInitiate () {
  return {
    type: FETCH_SKILLS_INITIATE,
    skills: []
  };
}

export function fetchChallengesComplete (data) {
  return {
    type: FETCH_SKILLS_COMPLETE,
    skills: data
  };
}

export function updateChallengesInitiate() {
  return {
    type: UPDATE_SKILLS_INITIATE,
    skills: []
  }
}

export function updateChallengesComplete(data) {
  return {
    type: UPDATE_SKILLS_COMPLETE,
    skills: data
  }
}

export function deleteChallengesInitiate() {
  return {
    type: DELETE_SKILLS_INITIATE,
    skills: []
  }
}

export function deleteChallengesComplete(data) {
  return {
    type: DELETE_SKILLS_COMPLETE,
    skills: data
  }
}


export function fetchChallenges () {
  return (dispatch) => {
    dispatch(fetchChallengesInitiate());

    const url = `${ConfigMain.getBackendURL()}/challenges`;
    return Axios.get(url)
      .then((response) => {
        dispatch(fetchChallengesComplete(response.data));
      })
      .catch(() => {
        fetchChallengesComplete([]);
      });
  };
}

export function updateChallenge(challenge) {
  return function (dispatch) {
    dispatch(updateChallengesInitiate());
    const url = `${ConfigMain.getBackendURL()}/challenges/${challenge._id}`;
    return (
      Axios.put(url, challenge)
      .then(function(response) {
        dispatch(updateChallengesComplete(response.data));
      })
      .catch(function(error) {
          dispatch(updateChallengesComplete([]));
      })
    );
  }
}

export function saveChallenge(challenge) {
  return function (dispatch) {
    dispatch(saveChallengesInitiate());
    const url = `${ConfigMain.getBackendURL()}/challenges`;
    return (
      Axios.post(url, challenge)
      .then(function(response) {
        dispatch(saveChallengesComplete(response.data));
      })
      .catch(function(error) {
          dispatch(saveChallengesComplete([]));
      })
    );
  }
}

export function deleteChallenge(challenge_ids) {
  return function (dispatch) {
    dispatch(deleteChallengesInitiate());
    const url = `${ConfigMain.getBackendURL()}/challenges/${challenge_ids}`;
    return (
      Axios.delete(url)
      .then(function(response) {
        dispatch(deleteChallengesComplete(response.data));
      })
      .catch(function(error) {
          dispatch(deleteChallengesComplete([]));
      })
    );
  }
}
