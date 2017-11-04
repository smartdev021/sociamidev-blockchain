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
    FETCH_USER_PROFILE_COMPLETE,
    FETCH_RESULTS_INITIATE,
    FETCH_RESULTS_COMPLETE,

    BOOKMARK_ADD,
    BOOKMARK_REMOVE,

    BOOKMARKS_SET,

    SIGNUP_FORM_OPEN,
    SIGNUP_FORM_CLOSE,

    SEARCH_QUERY_SET,

    SET_USER_AUTHORIZED,

    ROADMAP_ADD,
    ROADMAPS_SET,
    ROADMAP_REMOVE,
    ROADMAP_REMOVE_ALL,

    EXACT_LOCATION_SET,

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

export function fetchUserProfileComplete(userProfile) {
    return {
        type: FETCH_USER_PROFILE_COMPLETE,
        profile: userProfile
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

export function bookmarkAdd(newBookmark) {
    return {
        type: BOOKMARK_ADD,
        bookmark: newBookmark
    }
}

export function bookmarksSet(newBookmarks) {
    return {
        type: BOOKMARKS_SET,
        bookmarks: newBookmarks
    }
}

export function bookmarkRemove(bookmarkToRemove) {
    return {
        type: BOOKMARK_REMOVE,
        bookmark: bookmarkToRemove
    }
}

export function bookmarkRemoveAll() {
    return {
        type: BOOKMARK_REMOVE_ALL,
    }
}

export function roadmapAdd(newRoadmapId) {
    return {
        type: ROADMAP_ADD,
        roadmapId: newRoadmapId
    }
}

export function roadmapsSet(newRoadmapsIds) {
    return {
        type: ROADMAPS_SET,
        roadmapIds: newRoadmapsIds
    }
}

export function roadmapRemove(roadmapIdToRemove) {
    return {
        type: ROADMAP_REMOVE,
        roadmapId: roadmapIdToRemove
    }
}

export function roadmapRemoveAll(idToRemove) {
    return {
        type: ROADMAP_REMOVE_ALL,
    }
}

export function setSearchQuery(searchQuery) {
    return {
        type: SEARCH_QUERY_SET,
        query: searchQuery
    }
}

export function setUserAuthorized(value) {
    return {
        type: SET_USER_AUTHORIZED,
        authorized: value
    }
}

export function setExactLocation(exactLocation) {
    return {
        type: EXACT_LOCATION_SET,
        location: exactLocation
    }
}
