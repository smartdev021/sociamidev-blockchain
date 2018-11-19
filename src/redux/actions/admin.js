import {
  DELETE_USER_GUIDES_COMPLETE,
  DELETE_USER_GUIDES_INITIATE,
  FETCH_USER_GUIDES_COMPLETE,
  FETCH_USER_GUIDES_INITIATE,
  UPDATE_USER_GUIDES_COMPLETE,
  UPDATE_USER_GUIDES_INITIATE,
  ADD_USER_GUIDES_COMPLETE,
  ADD_USER_GUIDES_INITIATE
} from "./actionTypes";

import Axios from 'axios';
import ConfigMain from '~/configs/main';

export function fetchUserGuidesInitiate() {
  return {
    type: FETCH_USER_GUIDES_INITIATE,
    userGuides: []
  };
}

export function fetchUserGuidesComplete(data) {
  return {
    type: FETCH_USER_GUIDES_COMPLETE,
    userGuides: data
  };
}

export function updateUserGuidesInitiate() {
  return {
    type: UPDATE_USER_GUIDES_INITIATE,
    userGuides: []
  }
}

export function updateUserGuidesComplete(data) {
  return {
    type: UPDATE_USER_GUIDES_COMPLETE,
    updated: data
  }
}

export function addUserGuidesComplete(data) {
  return {
    type: ADD_USER_GUIDES_COMPLETE,
    data: data
  }
}

export function addUserGuidesInitiate() {
  return {
    type: ADD_USER_GUIDES_INITIATE,
    userGuides: []
  }
}

export function deleteUserGuidesInitiate() {
  return {
    type: DELETE_USER_GUIDES_INITIATE,
    userGuides: []
  }
}

export function deleteUserGuidesComplete(data) {
  return {
    type: DELETE_USER_GUIDES_COMPLETE,
    userGuides: data
  }
}

export function fetchUserGuides({activePage}) {
  return (dispatch) => {
    dispatch(fetchUserGuidesInitiate());
    const url = `${ConfigMain.getBackendURL()}/user-guide?page=${activePage}`;
    return Axios.get(url)
      .then((response) => {
        dispatch(fetchUserGuidesComplete(response.data));
      })
      .catch(() => {
        fetchUserGuidesComplete([]);
      });
  };
}

export function updateUserGuide(data) {
  return (dispatch) => {
    const url = `${ConfigMain.getBackendURL()}/user-guide/${data._id}`;
    return Axios.put(url, data)
      .then((response) => {
        dispatch(updateUserGuidesComplete({...data, hasChanged: false}));
      })
      .catch(() => {
        updateUserGuidesComplete([]);
      });
  };
}

export function addUserGuide(data) {
  return (dispatch) => {
    const url = `${ConfigMain.getBackendURL()}/user-guide`;
    return Axios.post(url, data)
      .then((response) => {
        dispatch(addUserGuidesComplete(response.data));
      })
      .catch(() => {
        addUserGuidesComplete(null);
      });
  };
}

export function deleteUserGuides(data) {
  return (dispatch) => {
    const url = `${ConfigMain.getBackendURL()}/user-guide`;
    return Axios.put(url, data)
      .then((response) => {
        dispatch(deleteUserGuidesComplete(response.data));
      })
      .catch(() => {
        deleteUserGuidesComplete(null);
      });
  };
}
