import Axios from 'axios'

import ConfigMain from '~/configs/main'

import {
    ROADMAP_ADD,
    ROADMAPS_SET,
    ROADMAP_REMOVE,
    ROADMAP_REMOVE_ALL,
    ROADMAPS_FETCH_INITIATE,
    ROADMAPS_FETCH_COMPLETE,
    ROADMAPS_DETAILED_SET,
} from './actionTypes';

export function roadmapAdd(newRoadmapId) {
    return {
        type: ROADMAP_ADD,
        roadmapId: newRoadmapId
    }
}

export function roadmapsSet(newRoadmapsIds) {
    return {
        type: ROADMAPS_SET,
        roadmapIds: newRoadmapsIds
    }
}

export function roadmapRemove(roadmapIdToRemove) {
    return {
        type: ROADMAP_REMOVE,
        roadmapId: roadmapIdToRemove
    }
}

export function roadmapRemoveAll(idToRemove) {
    return {
        type: ROADMAP_REMOVE_ALL,
    }
}

export function fetchRoadmapsInitiate() {
    return {
        type: ROADMAPS_FETCH_INITIATE,
    }
}

export function fetchRoadmapsComplete() {
    return {
        type: ROADMAPS_FETCH_COMPLETE,
    }
}

export function roadmapsDetailedSet(newRoadmaps) {
    return {
        type: ROADMAPS_DETAILED_SET,
        roadmaps: newRoadmaps,
    }
}

export function fetchRoadmapsDetailsByIds(roadmapIds) {
    return function (dispatch) {
      dispatch(fetchRoadmapsInitiate());
      
      if (roadmapIds && roadmapIds.length > 0) {

        let url = `${ConfigMain.getBackendURL()}/getRoadmapsByIds?`;
        
        for (let i = 0; i < roadmapIds.length; ++i) {
            url += `roadmaps=${roadmapIds[i]}&`;
        }

        return (
        Axios.get(url)
        .then(function(response) {
            dispatch(roadmapsDetailedSet(response.data));
            dispatch(fetchRoadmapsComplete());
        })
        .catch(function(error) {
            dispatch(roadmapsDetailedSet([]));
            dispatch(fetchRoadmapsComplete());
        }));
    }
  }
}