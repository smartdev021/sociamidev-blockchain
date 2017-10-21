import {combineReducers} from "redux"

import {currentCategory, 
  isOpenProfilePending, 
  isOpenSearchResultsPending, 
  searchResults,
  userProfile,
  isFetchInProgress,
} from "./syncReducers"

export default combineReducers({
  currentCategory,
  isOpenProfilePending,
  isOpenSearchResultsPending,
  isFetchInProgress,
  searchResults,
  userProfile,
});