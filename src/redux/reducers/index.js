import {combineReducers} from "redux"

import {currentCategory, isOpenProfilePending, isOpenSearchResultsPending} from "./syncReducers"

export default combineReducers({
  currentCategory,
  isOpenProfilePending,
  isOpenSearchResultsPending,
});