import {SELECT_RESULTS_CATEGORY, OPEN_USER_PROFILE} from './actionTypes';

//selects category 'RESULTS_CATEGORY_JOBS', 'RESULTS_CATEGORY_EVENTS', etc.
export function selectResultsCategory(newCategory) {
    return {
        type: SELECT_RESULTS_CATEGORY,
        category: newCategory,
    }
}

export function openUserProfile(category) {
    return {
        type: OPEN_USER_PROFILE,
    }
}

