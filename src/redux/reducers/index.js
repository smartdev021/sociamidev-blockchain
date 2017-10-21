import {combineReducers} from "redux"

import {currentCategory, 
  isOpenProfilePending, 
  isOpenSearchResultsPending, 
  searchResults,
  userProfile,
} from "./syncReducers"

export default combineReducers({
  currentCategory,
  isOpenProfilePending,
  isOpenSearchResultsPending,
  searchResults,
  userProfile,
});