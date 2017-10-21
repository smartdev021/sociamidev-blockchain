import {SELECT_RESULTS_CATEGORY, OPEN_USER_PROFILE} from '../actions/actionTypes';

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
        default:
          return state;
      }
}