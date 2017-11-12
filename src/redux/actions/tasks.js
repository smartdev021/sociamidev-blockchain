import {
    TASKS_SET,

    FETCH_TASKS_INITIATE,
    FETCH_TASKS_COMPLETE,

} from './actionTypes';

export function setTasks(newTasks) {
    return {
        type: TASKS_SET,
        tasks: newTasks
    }
}

export function fetchTasksInitiate() {
    return {
        type: FETCH_TASKS_INITIATE,
    }
}

export function fetchTasksComplete() {
    return {
        type: FETCH_TASKS_COMPLETE,
    }
}