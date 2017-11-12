import {
    OPEN_USER_PROFILE, 
    OPEN_USER_PROFILE_COMPLETE,
    FETCH_USER_PROFILE_COMPLETE,

    SIGNUP_FORM_OPEN,
    SIGNUP_FORM_CLOSE,

    SET_USER_AUTHORIZED,

} from './actionTypes';

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

export function setUserAuthorized(value) {
    return {
        type: SET_USER_AUTHORIZED,
        authorized: value
    }
}