import Axios from 'axios'

import {
    OPEN_USER_PROFILE, 
    OPEN_USER_PROFILE_COMPLETE,
    FETCH_USER_PROFILE_INITIATE,
    FETCH_USER_PROFILE_COMPLETE,
    FETCH_USER_PROFILE_TASKS_INITIATE,
    FETCH_USER_PROFILE_TASKS_COMPLETE,

    FETCH_USER_PROFILE_ACTIVITIES_INITIATE,
    FETCH_USER_PROFILE_ACTIVITIES_COMPLETE,

    PROGRESSION_TREE_START_INITIATE,
    PROGRESSION_TREE_START_COMPLETE,

    PROGRESSION_TREE_STOP_INITIATE,
    PROGRESSION_TREE_STOP_COMPLETE,

    SIGNUP_FORM_OPEN,
    SIGNUP_FORM_CLOSE,

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

export function fetchUserProfileComplete(userProfile, authorized) {
    return {
        type: FETCH_USER_PROFILE_COMPLETE,
        profile: userProfile,
        isAuthorized: authorized,
    }
}

export function fetchUserProfileInitiate() {
    return {
        type: FETCH_USER_PROFILE_INITIATE,
        profile: {}
    }
}

export function fetchUserProfileTasksInitiate() {
    return {
        type: FETCH_USER_PROFILE_TASKS_INITIATE,
    }
}

export function fetchUserProfileTasksComplete(assignedTasks, createdTasks) {
    return {
        type: FETCH_USER_PROFILE_TASKS_COMPLETE,
        tasksAssigned: assignedTasks,
        tasksCreated: createdTasks,
    }
}

export function fetchUserActivitiesInitiate() {
    return {
        type: FETCH_USER_PROFILE_ACTIVITIES_INITIATE,
    }
}

export function fetchUserActivitiesComplete(activities) {
    return {
        type: FETCH_USER_PROFILE_ACTIVITIES_COMPLETE,
        activities: activities,
    }
}

export function fetchUserActivities(userId) {
    
    return function (dispatch) {

        dispatch(fetchUserActivitiesInitiate());

        const url = `${ConfigMain.getBackendURL()}/userActivitiesGet?id=${userId}&doNotTransform=1`;
    
        return (
          Axios.get(url)
          .then(function(response) {
              console.log("%cfetchUserActivities: ", "color: red; background: grey;");
              console.dir(response.data);
            dispatch(fetchUserActivitiesComplete(response.data[0].activities.map(function(userActivityData, i) {
                return userActivityData.activity;
            })));
          })
          .catch(function(error) {
            dispatch(fetchUserActivitiesComplete([]));
        }));
    }
}

export function startProgressionTreeInitiate() {
    return {
        type: PROGRESSION_TREE_START_INITIATE,
    }
}

export function startProgressionTreeComplete(tree) {
    return {
        type: PROGRESSION_TREE_START_COMPLETE,
        tree: tree,
    }
}

export function stopProgressionTreeInitiate(tree) {
    return {
        type: PROGRESSION_TREE_STOP_INITIATE,
    }
}

export function stopProgressionTreeComplete(tree) {
    return {
        type: PROGRESSION_TREE_STOP_COMPLETE,
        tree: tree,
    }
}

export function startProgressionTree(userId, progressionTree) {
    
    return function (dispatch) {

        dispatch(startProgressionTreeInitiate());

        const url = `${ConfigMain.getBackendURL()}/userProgressionTreeStart`;

        const body = {userId: userId, progTree: progressionTree};
    
        return (
          Axios.post(url, body)
            .then(function(response) {
                dispatch(startProgressionTreeComplete(response.data));
            })
            .catch(function(error) {
                dispatch(startProgressionTreeComplete([]));
            }));
    }
}

export function stopProgressionTree(userId, progressionTree) {
    
    return function (dispatch) {

        dispatch(startProgressionTreeInitiate());

        const url = `${ConfigMain.getBackendURL()}/userProgressionTreeStop`;

        const body = {userId: userId, progTree: progressionTree};
    
        return (
          Axios.post(url, body)
            .then(function(response) {
                dispatch(stopProgressionTreeComplete(response.data));
            })
            .catch(function(error) {
                dispatch(stopProgressionTreeComplete([]));
            }));
    }
}


export function fetchUserTasks(userId) {
    
    return function (dispatch) {

        dispatch(fetchUserProfileTasksInitiate());

        const url = `${ConfigMain.getBackendURL()}/tasksGetForUser?userId=${userId}&assigneeId=${userId}`;
    
        return (
          Axios.get(url)
            .then(function(response) {

                let tasksAssigned = [];
                let tasksCreated = [];

                for (let i = 0; i < response.data.length; ++i) {
                    if (response.data[i].assignees && response.data[i].assignees.find(function(assignee) {
                        return assignee._id == userId;
                    })) {
                        tasksAssigned.push(response.data[i]);
                    }
                    else if (response.data[i].userID == userId) {
                        tasksCreated.push(response.data[i]);
                    }
                }

                dispatch(fetchUserProfileTasksComplete(tasksAssigned, tasksCreated));
            })
            .catch(function(error) {
                dispatch(fetchUserProfileTasksComplete([], []));
            }));
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
              hangouts: response.data.hangouts,
              roadmaps: response.data.roadmaps,
              progressionTrees: response.data.progressionTrees,
              facebook: response.data.facebook,
            }

            newUserProfile = Object.assign({}, newUserProfile, {...responseProfile});

            //async action exit point
            dispatch(fetchUserProfileComplete(newUserProfile, true));
        })
        .catch(function(error) {
            //async action exit point
            dispatch(fetchUserProfileComplete({}, false));
        }));
    }
}