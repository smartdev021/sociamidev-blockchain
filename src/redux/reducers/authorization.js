import { 
    OPEN_USER_PROFILE, 
    OPEN_USER_PROFILE_COMPLETE, 
    FETCH_USER_PROFILE_COMPLETE,
    FETCH_USER_PROFILE_INITIATE,
    SIGNUP_FORM_OPEN,
    SIGNUP_FORM_CLOSE,
    FETCH_USER_PROFILE_TASKS_INITIATE,
    FETCH_USER_PROFILE_TASKS_COMPLETE,
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
  },
  tasks: {
    assigned: [],
    created: [],
    isLoading: false,
  },
  isAuthorized: false,
  isLoading: false,
};
  
export function userProfile(state = userProfileInitialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE_INITIATE:
      return {...state, profile: action.profile, isAuthorized: false, isLoading: true};
    case FETCH_USER_PROFILE_COMPLETE:
      return {...state, profile: action.profile, isAuthorized: action.isAuthorized, isLoading: false};
    case FETCH_USER_PROFILE_TASKS_INITIATE: {
      return {...state, tasks: {assigned: [], created: [], isLoading: true}};
    }
    case FETCH_USER_PROFILE_TASKS_COMPLETE: {
      return {...state, tasks: {assigned: action.tasksAssigned, created: action.tasksCreated, isLoading: false}};
    }
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