import {combineReducers} from "redux"

import {currentCategory, isOpenProfilePending} from "./syncReducers"

export default combineReducers({
  currentCategory,
  isOpenProfilePending,
});