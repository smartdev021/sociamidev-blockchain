import { 
    OPEN_USER_PROFILE, 
    OPEN_USER_PROFILE_COMPLETE, 
    FETCH_USER_PROFILE_COMPLETE,
    FETCH_USER_PROFILE_INITIATE,
    SIGNUP_FORM_OPEN,
    SIGNUP_FORM_CLOSE,
    FETCH_USER_PROFILE_TASKS_INITIATE,
    FETCH_USER_PROFILE_TASKS_COMPLETE,
    FETCH_USER_PROFILE_ACTIVITIES_INITIATE,
    FETCH_USER_PROFILE_ACTIVITIES_COMPLETE,

    UPDATE_USER_PROFILE_INITIATE,
    UPDATE_USER_PROFILE_COMPLETE,

    PROGRESSION_TREE_START_INITIATE,
    PROGRESSION_TREE_START_COMPLETE,

    PROGRESSION_TREE_STOP_INITIATE,
    PROGRESSION_TREE_STOP_COMPLETE,

    USER_LOG_OUT,
    
} from '~/src/redux/actions/actionTypes';

export function isOpenProfilePending(state = false, action) {
  switch (action.type) {
    case OPEN_USER_PROFILE:
      return (!state) ? true : state;
    case OPEN_USER_PROFILE_COMPLETE:
      return (state) ? false : state;
    default:
      return state;
    }
}
  
const userProfileInitialState = {
  profile: {
    firstName: 'John', 
    lastName: 'Doe', 
    interests: 'programming, study',
    skills: 'javascript, c++', 
    experience: 'Google',
    education: 'Harvard',
    facebook: null,
    linkedin: null,
    progressionTrees: [],
  },
  tasks: {
    assigned: [],
    created: [],
    isLoading: false,
  },
  activities: {
    data: [],
    isLoading: false,
  },
  isAuthorized: false,
  isLoading: false,
};
  
export function userProfile(state = userProfileInitialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE_INITIATE:
      return {...state, isLoading: true};
    case USER_LOG_OUT:
      return userProfileInitialState;
    case FETCH_USER_PROFILE_COMPLETE:
      return {...state, profile: action.profile, isAuthorized: action.isAuthorized, isLoading: false};
    case UPDATE_USER_PROFILE_INITIATE:
      return {...state, isLoading: true};
    case UPDATE_USER_PROFILE_COMPLETE:
      return {...state, isAuthorized: true, isLoading: false, profile: action.profile};
    case FETCH_USER_PROFILE_TASKS_INITIATE: {
      return {...state, tasks: {assigned: [], created: [], isLoading: true}};
    }
    case FETCH_USER_PROFILE_TASKS_COMPLETE: {
      return {...state, tasks: {assigned: action.tasksAssigned, created: action.tasksCreated, isLoading: false}};
    }
    case FETCH_USER_PROFILE_ACTIVITIES_INITIATE: {
      return {...state, activities: Object.assign({}, state.activities, { isLoading: true })};
    }
    case FETCH_USER_PROFILE_ACTIVITIES_COMPLETE: {
      return {...state, activities: Object.assign({}, state.activities, { data: action.activities, isLoading: false })};
    }
    case PROGRESSION_TREE_START_INITIATE: {
      return {...state, isLoading: true};
    }
    case PROGRESSION_TREE_START_COMPLETE:
      return {...state, profile: Object.assign({}, state.profile, {progressionTrees: state.profile.progressionTrees.concat(action.tree)}), isLoading: false};
    case PROGRESSION_TREE_STOP_INITIATE:
      return {...state, isLoading: true};
    case PROGRESSION_TREE_STOP_COMPLETE:
      const foundTreeIndex = state.profile.progressionTrees.findIndex(function(tree) {
        return tree._id == action.tree._id;
      })

      if (foundTreeIndex == -1) {
        return {...state, isLoading: false};
      }
      else {
        let progressionTreesCopy = state.profile.progressionTrees.slice();
        progressionTreesCopy.splice(foundTreeIndex, 1);

        return {...state, profile: Object.assign({}, state.profile, {progressionTrees: progressionTreesCopy}), isLoading: false};
      }
      return {...state, profile: Object.assign({}, state.profile, {progressionTrees: state.profile.progressionTrees.concat(action.tree)}), isLoading: false};
    default:
      return state;
    }
}

export function isSignUpFormOpen(state = false, action) {
  switch (action.type) {
    case SIGNUP_FORM_OPEN:
      return (!state) ? true : state;
    case SIGNUP_FORM_CLOSE:
      return (state) ? false : state;
    default:
      return state;
    }
}