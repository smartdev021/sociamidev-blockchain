import {SELECT_RESULTS_CATEGORY, OPEN_USER_PROFILE} from './actionTypes';

//selects category 'RESULTS_CATEGORY_JOBS', 'RESULTS_CATEGORY_EVENTS', etc.
export const selectResultsCategory = category => ({
    type: SELECT_RESULTS_CATEGORY,
    category
})

export const openUserProfile = () => ({
    type: OPEN_USER_PROFILE,
})