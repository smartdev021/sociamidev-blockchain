import Axios from 'axios'

import ConfigMain from '~/configs/main'

import {
    FETCH_JOB_ITEMS_INITIATE,
    FETCH_JOB_ITEMS_COMPLETE,
    FETCH_EVENT_ITEMS_INITIATE,
    FETCH_EVENT_ITEMS_COMPLETE,
    FETCH_COURSE_ITEMS_INITIATE,
    FETCH_COURSE_ITEMS_COMPLETE,
    FETCH_GIG_ITEMS_INITIATE,
    FETCH_GIG_ITEMS_COMPLETE,
    FETCH_RESULTS_INITIATE,
    FETCH_RESULTS_COMPLETE,

    SELECT_RESULTS_CATEGORY,
    OPEN_SEARCH_RESULTS,
    OPEN_SEARCH_RESULTS_COMPLETE,
    SEARCH_QUERY_SET

} from './actionTypes';

export function fetchJobItemsInitiate() {
    return {
        type: FETCH_JOB_ITEMS_INITIATE,
    }
}

export function fetchJobItemsComplete(newItems) {
    return {
        type: FETCH_JOB_ITEMS_COMPLETE,
        items: newItems
    }
}

export function fetchEventItemsInitiate() {
    return {
        type: FETCH_EVENT_ITEMS_INITIATE,
    }
}

export function fetchEventItemsComplete(newItems) {
    return {
        type: FETCH_EVENT_ITEMS_COMPLETE,
        items: newItems
    }
}

export function fetchCourseItemInitiate() {
    return {
        type: FETCH_COURSE_ITEMS_INITIATE,
    }
}

export function fetchCourseItemsComplete(newItems) {
    return {
        type: FETCH_COURSE_ITEMS_COMPLETE,
        items: newItems
    }
}

export function fetchGigItemsInitiate() {
    return {
        type: FETCH_GIG_ITEMS_INITIATE,
    }
}

export function fetchGigItemsComplete(newItems) {
    return {
        type: FETCH_GIG_ITEMS_COMPLETE,
        items: newItems
    }
}

export function fetchResultsInitiate() {
    return {
        type: FETCH_RESULTS_INITIATE,
    }
}

export function fetchResultsComplete() {
    return {
        type: FETCH_RESULTS_COMPLETE,
    }
}

//selects category 'RESULTS_CATEGORY_JOBS', 'RESULTS_CATEGORY_EVENTS', etc.
export function selectResultsCategory(newCategory) {
    return {
        type: SELECT_RESULTS_CATEGORY,
        category: newCategory,
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

export function setSearchQuery(searchQuery) {
    return {
        type: SEARCH_QUERY_SET,
        query: searchQuery
    }
}