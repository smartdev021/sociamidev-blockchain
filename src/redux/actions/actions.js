import {
    SELECT_RESULTS_CATEGORY,
    OPEN_USER_PROFILE, 
    OPEN_USER_PROFILE_COMPLETE,
    OPEN_SEARCH_RESULTS,
    OPEN_SEARCH_RESULTS_COMPLETE,
    FETCH_JOB_ITEMS_COMPLETE,
    FETCH_EVENT_ITEMS_COMPLETE,
    FETCH_COURSE_ITEMS_COMPLETE,
    FETCH_GIG_ITEMS_COMPLETE,
} from './actionTypes';

//selects category 'RESULTS_CATEGORY_JOBS', 'RESULTS_CATEGORY_EVENTS', etc.
export function selectResultsCategory(newCategory) {
    return {
        type: SELECT_RESULTS_CATEGORY,
        category: newCategory,
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

export function openSearchResults() {
    return {
        type: OPEN_SEARCH_RESULTS,
    }
}

export function openSearchResultsComplete() {
    return {
        type: OPEN_SEARCH_RESULTS_COMPLETE,
    }
}

export function fetchJobItemsComplete(newItems) {
    return {
        type: FETCH_JOB_ITEMS_COMPLETE,
        items: newItems
    }
}

export function fetchEventItemsComplete(newItems) {
    return {
        type: FETCH_EVENT_ITEMS_COMPLETE,
        items: newItems
    }
}


export function fetchCourseItemsComplete(newItems) {
    return {
        type: FETCH_COURSE_ITEMS_COMPLETE,
        items: newItems
    }
}


export function fetchGigItemsComplete(newItems) {
    return {
        type: FETCH_GIG_ITEMS_COMPLETE,
        items: newItems
    }
}


