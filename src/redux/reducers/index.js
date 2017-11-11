import {combineReducers} from "redux"

import {currentCategory, 
  isOpenProfilePending, 
  isOpenSearchResultsPending, 
  searchResults,
  userProfile,
  isFetchInProgress,
  bookmarks,
  isAuthorized,
  isSignUpFormOpen,
  searchQuery,
  userRoadmaps,
  exactLocation,
  tasks,
  isTasksFetchInProgress,
} from "./syncReducers"

export default combineReducers({
  currentCategory,
  isOpenProfilePending,
  isOpenSearchResultsPending,
  isFetchInProgress,
  searchResults,
  userProfile,
  bookmarks,
  userRoadmaps,
  isSignUpFormOpen,
  searchQuery,
  isAuthorized,
  exactLocation,
  tasks,
  isTasksFetchInProgress,
});