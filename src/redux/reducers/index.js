import { combineReducers } from "redux"

import { exactLocation } from "./miscReducers"
import { bookmarks } from "./bookmarks"
import { isFetchInProgress, searchResults, isOpenSearchResultsPending, searchQuery, resultsSelectedCategory } from "./fetchResults"
import { userRoadmaps, roadmapsDetailed, isFetchingRoadmaps} from "./roadmaps"
import { tasks, isTasksFetchInProgress} from "./tasks"
import { isAuthorized, isOpenProfilePending, userProfile, isSignUpFormOpen } from "./authorization"

export default combineReducers({
  resultsSelectedCategory,
  isOpenProfilePending,
  isOpenSearchResultsPending,
  isFetchInProgress,
  searchResults,
  userProfile,
  bookmarks,
  userRoadmaps,
  roadmapsDetailed,
  isFetchingRoadmaps,
  isSignUpFormOpen,
  searchQuery,
  isAuthorized,
  exactLocation,
  tasks,
  isTasksFetchInProgress,
});