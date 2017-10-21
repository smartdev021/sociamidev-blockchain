import {
  SELECT_RESULTS_CATEGORY,
  OPEN_USER_PROFILE, 
  OPEN_USER_PROFILE_COMPLETE,
  OPEN_SEARCH_RESULTS,
  OPEN_SEARCH_RESULTS_COMPLETE
} from '../actions/actionTypes';

export function currentCategory(state = "RESULTS_CATEGORY_JOBS", action) {
    console.log("action.category: " + action.category);
    switch (action.type) {
        case SELECT_RESULTS_CATEGORY:
          return action.category;
        default:
          return state;
      }
}

export function isOpenProfilePending(state = false, action) {
    switch (action.type) {
        case OPEN_USER_PROFILE:
          return (!state) ? true : state;
        case OPEN_USER_PROFILE_COMPLETE:
          return (state) ? false : state;
        default:
          return state;
      }
}

export function isOpenSearchResultsPending(state = false, action) {
  switch (action.type) {
      case OPEN_SEARCH_RESULTS:
        return (!state) ? true : state;
      case OPEN_SEARCH_RESULTS_COMPLETE:
        return (state) ? false : state;
      default:
        return state;
    }
}