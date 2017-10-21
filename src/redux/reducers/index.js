import {SELECT_RESULTS_CATEGORY, OPEN_USER_PROFILE} from '../actions/actionTypes';

const initialState = {
    currentCategory: "RESULTS_CATEGORY_JOBS",
  }

export const categorySelector = (state = initialState, action) => {
    console.log("Category selector");
    switch (action.type) {
      case SELECT_RESULTS_CATEGORY:
      return {...state, currentCategory: action.category}
      default:
        return state
    }
}