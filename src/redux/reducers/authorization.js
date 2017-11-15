import { 
    OPEN_USER_PROFILE, 
    OPEN_USER_PROFILE_COMPLETE, 
    FETCH_USER_PROFILE_COMPLETE, 
    SET_USER_AUTHORIZED,
    SIGNUP_FORM_OPEN,
    SIGNUP_FORM_CLOSE,
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
  firstName: 'John', 
  lastName: 'Doe', 
  interests: 'programming, study',
  skills: 'javascript, c++', 
  experience: 'Google',
  education: 'Harvard'
};
  
export function userProfile(state = userProfileInitialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE_COMPLETE:
      return action.profile;
    default:
      return state;
    }
}
  
export function isAuthorized(state = false, action) {
  switch (action.type) {
    case SET_USER_AUTHORIZED:
      return action.authorized;
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