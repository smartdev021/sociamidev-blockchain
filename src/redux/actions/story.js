import { FETCH_STORIES_INITIATE, FETCH_STORIES_COMPLETE } from './actionTypes';

import Axios from 'axios';
import ConfigMain from '~/configs/main';

export function fetchStoriesInitiate () {
  return {
    type: FETCH_STORIES_INITIATE
  };
}

export function fetchStoriesComplete (data) {
  return {
    type: FETCH_STORIES_COMPLETE,
    data
  };
}

export function fetchStories () {
  return (dispatch) => {
    dispatch(fetchStoriesInitiate());

    const url = `${ConfigMain.getBackendURL()}/skillsGet`;
    return Axios.get(url)
      .then((response) => {
        dispatch(fetchStories(response.data));
      })
      .catch(() => {
        fetchStoriesComplete([]);
      });
  };
}
