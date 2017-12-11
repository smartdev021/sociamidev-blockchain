

import { 
  ROADMAP_ADD, 
  ROADMAP_REMOVE, 
  ROADMAP_REMOVE_ALL, 
  ROADMAPS_SET,
  ROADMAPS_FETCH,
  ROADMAPS_FETCH_INITIATE,
  ROADMAPS_FETCH_COMPLETE,
  ROADMAPS_DETAILED_SET,
  ROADMAPS_DETAILED_REMOVE_ALL,
} from '~/src/redux/actions/actionTypes';

const userRoadmapsInitialState = {roadmaps: [], amount: 0};

/*export function userRoadmaps(state = userRoadmapsInitialState, action) {
  switch (action.type) {
      case ROADMAP_ADD:
      {
        if (state.roadmaps.indexOf(action.roadmapId) != -1) {
          return state;
        }

        let newRoadmaps = state.roadmaps.concat(action.roadmapId);
        return {...state, roadmaps: newRoadmaps, amount: newRoadmaps.length};
      }
      case ROADMAPS_SET:
      {
        return {...state, roadmaps: action.roadmapIds, amount: action.roadmapIds.length};
      }
      case ROADMAP_REMOVE:
      {
        let foundRoadmapIndex = state.roadmaps.indexOf(action.roadmapId);

        if (foundRoadmapIndex != -1) {
          let newRoadmapIds = Object.assign(state.roadmaps);
          newRoadmapIds.splice(foundRoadmapIndex, 1);

          return {...state, roadmaps: newRoadmapIds, amount: newRoadmapIds.length};
        }

        return state;
      }
      case ROADMAP_REMOVE_ALL:
          return userRoadmapsInitialState;
      default:
        return state;
    }
}*/
const roadmapsInitialState = {isFetching: false, data: []};
export function roadmaps(state = roadmapsInitialState, action) {
  switch (action.type) {
    case ROADMAPS_FETCH_INITIATE:
      return {...state, isFetching: true}
    case ROADMAPS_FETCH_COMPLETE:
      return {...state, isFetching: false, data: action.roadmaps};
    default:
      return state;
  }
}

export function roadmapsDetailed(state = [], action) {
  switch (action.type) {
    case ROADMAPS_DETAILED_SET:
      return action.roadmaps;
    case ROADMAPS_DETAILED_REMOVE_ALL:
      return [];
    default:
      return state;
  }
}