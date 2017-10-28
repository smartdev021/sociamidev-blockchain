import {combineReducers} from "redux"

import {currentCategory, 
  isOpenProfilePending, 
  isOpenSearchResultsPending, 
  searchResults,
  userProfile,
  isFetchInProgress,
  bookmarks,
  isSignUpFormOpen,
  searchQuery,
  isAuthorized,
} from "./syncReducers"

export default combineReducers({
  currentCategory,
  isOpenProfilePending,
  isOpenSearchResultsPending,
  isFetchInProgress,
  searchResults,
  userProfile,
  bookmarks,
  isSignUpFormOpen,
  searchQuery,
  isAuthorized,
});