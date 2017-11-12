import {
    ROADMAP_ADD,
    ROADMAPS_SET,
    ROADMAP_REMOVE,
    ROADMAP_REMOVE_ALL,
} from './actionTypes';

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