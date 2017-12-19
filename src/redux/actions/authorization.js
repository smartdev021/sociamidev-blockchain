import Axios from 'axios'

import {
    OPEN_USER_PROFILE, 
    OPEN_USER_PROFILE_COMPLETE,
    FETCH_USER_PROFILE_INITIATE,
    FETCH_USER_PROFILE_COMPLETE,

    SIGNUP_FORM_OPEN,
    SIGNUP_FORM_CLOSE,

    SET_USER_AUTHORIZED,

} from './actionTypes';

import ConfigMain from '~/configs/main'

export function openSignUpForm() {
    return {
        type: SIGNUP_FORM_OPEN,
    }
}

export function closeSignUpForm() {
    return {
        type: SIGNUP_FORM_CLOSE,
    }
}

export function openUserProfile() {
    return {
        type: OPEN_USER_PROFILE,
    }
}

export function openUserProfileComplete() {
    return {
        type: OPEN_USER_PROFILE_COMPLETE,
    }
}

export function fetchUserProfileComplete(userProfile) {
    return {
        type: FETCH_USER_PROFILE_COMPLETE,
        profile: userProfile
    }
}

export function fetchUserProfileInitiate() {
    return {
        type: FETCH_USER_PROFILE_INITIATE,
        profile: {}
    }
}

export function setUserAuthorized(value) {
    return {
        type: SET_USER_AUTHORIZED,
        authorized: value
    }
}

export function fetchUserProfile(userIdFacebook, userIdLinkedIn) {

    return function (dispatch) {
  
        //async action entry point
      dispatch(fetchUserProfileInitiate());

      const url = userIdFacebook ? `${ConfigMain.getBackendURL()}/fetchUserProfile?faceBookID=${userIdFacebook}`
      : `${ConfigMain.getBackendURL()}/fetchUserProfile?linkedInID=${userIdLinkedIn}`;

      return (
        Axios.get(url)
        .then(function(response) {
            const responseProfile = response.data.profile;
            let newUserProfile = {
              _id: response.data._id,
              firstName: responseProfile.firstName, 
              lastName: responseProfile.lastName, 
              interests: responseProfile.interests, //TODO: receive FaceBook advanced permissions
              skills: responseProfile.skills, //TODO: receive FaceBook advanced permissions
              experience: responseProfile.experience,
              education: responseProfile.education,
              roadmaps: response.data.roadmaps,
              progressionTrees: response.data.progressionTrees,
              balance:responseProfile.balance
            }

            //async action exit point
            dispatch(fetchUserProfileComplete(newUserProfile));
            dispatch(setUserAuthorized(true));
        })
        .catch(function(error) {
            //async action exit point
            dispatch(fetchUserProfileComplete({}));
            dispatch(setUserAuthorized(false));
        }));
    }
}