

import { ROADMAP_ADD, ROADMAP_REMOVE, ROADMAP_REMOVE_ALL, ROADMAPS_SET } from '~/src/redux/actions/actionTypes';

const userRoadmapsInitialState = {roadmaps: [], amount: 0};

export function userRoadmaps(state = userRoadmapsInitialState, action) {
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
}