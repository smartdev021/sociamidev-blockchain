import { DELETE_SKILLS_INITIATE, DELETE_SKILLS_COMPLETE, SAVE_SKILLS_INITIATE, SAVE_SKILLS_COMPLETE, FETCH_SKILLS_INITIATE, FETCH_SKILLS_COMPLETE, UPDATE_SKILLS_INITIATE, UPDATE_SKILLS_COMPLETE } from './actionTypes';

import Axios from 'axios';
import ConfigMain from '~/configs/main';

export function saveStoriesInitiate () {
  return {
    type: SAVE_SKILLS_INITIATE,
    skills: []
  };
}

export function saveStoriesComplete (data) {
  return {
    type: SAVE_SKILLS_COMPLETE,
    skills: data
  };
}

export function fetchStoriesInitiate () {
  return {
    type: FETCH_SKILLS_INITIATE,
    skills: []
  };
}

export function fetchStoriesComplete (data) {
  return {
    type: FETCH_SKILLS_COMPLETE,
    skills: data
  };
}

export function updateStoriesInitiate() {
  return {
    type: UPDATE_SKILLS_INITIATE,
    skills: []
  }
}

export function updateStoriesComplete(data) {
  return {
    type: UPDATE_SKILLS_COMPLETE,
    skills: data
  }
}

export function deleteStoriesInitiate() {
  return {
    type: DELETE_SKILLS_INITIATE,
    skills: []
  }
}

export function deleteStoriesComplete(data) {
  return {
    type: DELETE_SKILLS_COMPLETE,
    skills: data
  }
}


export function fetchStories () {
  return (dispatch) => {
    dispatch(fetchStoriesInitiate());

    const url = `${ConfigMain.getBackendURL()}/storiesGetAll`;
    return Axios.get(url)
      .then((response) => {
        dispatch(fetchStoriesComplete(response.data));
      })
      .catch(() => {
        fetchStoriesComplete([]);
      });
  };
}

export function updateStory(story) {
  return function (dispatch) {
    dispatch(updateStoriesInitiate());
    const url = `${ConfigMain.getBackendURL()}/story/${story._id}`;
    return (
      Axios.put(url, story)
      .then(function(response) {
        dispatch(updateStoriesComplete(response.data));
      })
      .catch(function(error) {
          dispatch(updateStoriesComplete([]));
      })
    );
  }
}

export function saveStory(story) {
  return function (dispatch) {
    dispatch(saveStoriesInitiate());
    const url = `${ConfigMain.getBackendURL()}/saveStory`;
    return (
      Axios.post(url, story)
      .then(function(response) {
        dispatch(saveStoriesComplete(response.data));
      })
      .catch(function(error) {
          dispatch(saveStoriesComplete([]));
      })
    );
  }
}

export function deleteStory(story_ids) {
  return function (dispatch) {
    dispatch(deleteStoriesInitiate());
    const url = `${ConfigMain.getBackendURL()}/deleteStory`;
    return (
      Axios.delete(url, { data : { ids: story_ids }})
      .then(function(response) {
        dispatch(deleteStoriesComplete(response.data));
      })
      .catch(function(error) {
          dispatch(deleteStoriesComplete([]));
      })
    );
  }
}