import { combineReducers } from "redux"

import { exactLocation } from "./miscReducers"
import { bookmarks } from "./bookmarks"
import { isFetchInProgress, searchResults, isOpenSearchResultsPending, searchQuery, resultsSelectedCategory } from "./fetchResults"
import { roadmaps, roadmapsDetailed, roadmapsAdmin } from "./roadmaps"
import { tasks, lastSavedTask, lastStartedTask } from "./tasks"
import { isOpenProfilePending, userProfile, isSignUpFormOpen } from "./authorization"
import { projects, isProjectSaveInProgress, isProjectsFetchInProgress} from "./projects"
import { userFriends } from "./social"
import { userFriendsActivities } from "./activities"
import { characterCreation, characterCreationData } from "./characterCreation"
import { accounting } from "./accounting"
import { progression } from "./progression"
import { achievements } from "./achievements"
import { timers } from './timers';

export default combineReducers({
  resultsSelectedCategory,
  isOpenProfilePending,
  isOpenSearchResultsPending,
  isFetchInProgress,
  searchResults,
  userProfile,
  userFriends,
  userFriendsActivities,
  bookmarks,
  roadmaps,
  roadmapsDetailed,
  roadmapsAdmin,
  isSignUpFormOpen,
  searchQuery,
  exactLocation,
  tasks,
  lastSavedTask,
  lastStartedTask,
  projects,
  isProjectSaveInProgress,
  isProjectsFetchInProgress,
  characterCreation,
  characterCreationData,
  accounting,
  progression,
  achievements,
  timers
});