import Axios from 'axios'

import ConfigMain from '~/configs/main'

import {
    TASK_UPDATE,
    TASK_ADD,
    TASK_REMOVE,

    TASK_LASTSAVED_SET,
    TASK_LASTSTARTED_SET,

    FETCH_TASKS_INITIATE,
    FETCH_TASKS_COMPLETE,

    UPDATE_TASK_INITIATE,
    UPDATE_TASK_COMPLETE,

    SAVE_TASK_INITIATE,
    SAVE_TASK_COMPLETE,
    TASK_SET_PUBLISHED,

} from './actionTypes';

export function addTask(newTask) {
    return {
        type: TASK_ADD,
        task: newTask
    }
}

export function removeTask(taskId) {
    return {
        type: TASK_REMOVE,
        id: taskId
    }
}

export function updateTask(taskId, newTask) {
    return {
        type: TASK_UPDATE,
        id: taskId,
        task: newTask,
    }
}

export function setLastSavedTask(newTask) {
    return {
        type: TASK_LASTSAVED_SET,
        task: newTask,
    }
}

export function setLastStartedTask(newTask) {
    return {
        type: TASK_LASTSTARTED_SET,
        task: newTask,
    }
}

export function fetchTasksInitiate() {
    return {
        type: FETCH_TASKS_INITIATE,
    }
}

export function fetchTasksComplete(tasks) {
    return {
        type: FETCH_TASKS_COMPLETE,
        tasks: tasks,
    }
}

export function saveTaskInitiate() {
    return {
        type: SAVE_TASK_INITIATE,
    }
}

export function saveTaskComplete() {
    return {
        type: SAVE_TASK_COMPLETE,
    }
}

export function updateTaskInitiate() {
    return {
        type: UPDATE_TASK_INITIATE,
    }
}

export function updateTaskComplete() {
    return {
        type: UPDATE_TASK_COMPLETE,
    }
}

export function setTaskPublished(taskId, published) {
    return function (dispatch) {
        dispatch(updateTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/taskSetPublished?id=${taskId}&isHidden=${published ? 0 : 1}`;
        return (
            Axios.get(url)
                .then(function (response) {
                    dispatch(updateTask(response.data._id, response.data));
                    dispatch(updateTaskComplete());
                })
                .catch(function (error) {
                    dispatch(updateTaskComplete({}));
                }));
    }
}

export function rateTaskPartner(taskId, fromUser, toUser, rate) {
    return function (dispatch) {
        dispatch(updateTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/hangoutRateParticipant`;
        const body = { taskId: taskId, fromUser: fromUser, toUser: toUser, rate: rate }

        return (Axios.post(url, body)
            .then(function (response) {
                dispatch(updateTask(response.data._id, response.data));
                dispatch(updateTaskComplete());
            })
            .catch((error) => {
                console.log(error);
                dispatch(updateTaskComplete({}));
            }));
    }
}

export function taskAssign(taskId, assignee) {
    return function (dispatch) {
        dispatch(updateTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/taskAssign`;

        const body = {
            _id: taskId,
            assignee: assignee,
        };

        return (Axios.post(url, body)
            .then(function (response) {
                dispatch(updateTask(response.data._id, response.data));
                dispatch(updateTaskComplete());
            })
            .catch((error) => {
                console.log(error);
                dispatch(updateTaskComplete({}));
            }));
    }
}

export function saveTask(task) {
    return function (dispatch) {

        //async action entry point
        dispatch(saveTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/taskSavePost`;
        return (
            Axios.post(url, task)
                .then(function (response) {
                    dispatch(setLastSavedTask(response.data));
                    dispatch(addTask(response.data));
                    dispatch(saveTaskComplete());
                })
                .catch(function (error) {
                    dispatch(saveTaskComplete());
                }));
    }
}

export function deleteTask(taskId) {
    return function (dispatch) {

        //async action entry point
        dispatch(saveTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/taskDelete?id=${taskId}`;
        return (
            Axios.get(url)
                .then(function (response) {
                    dispatch(removeTask(response.data._id));
                    dispatch(saveTaskComplete());
                })
                .catch(function (error) {
                    dispatch(saveTaskComplete());
                }));
    }
}

export function fetchAllTasks(publishedOnly) {
    console.log("publishedOnly: " + publishedOnly);
    return function (dispatch) {

        //async action entry point
        dispatch(fetchTasksInitiate());

        const url = `${ConfigMain.getBackendURL()}/tasksGet?publishedOnly=${publishedOnly ? 1 : 0}`;
        return (
            Axios.get(url)
                .then(function (response) {
                    dispatch(fetchTasksComplete(response.data));
                })
                .catch(function (error) {
                    dispatch(fetchTasksComplete([]));
                }));
    }
}

export function hangoutJoin(hangoutId, user) {
    return function (dispatch) {
        dispatch(saveTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/hangoutJoin`;

        const body = {
            hangoutID: hangoutId,

            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
        return (
            Axios.post(url, body)
                .then(function (response) {
                    dispatch(saveTaskComplete());
                })
                .catch(function (error) {
                    dispatch(saveTaskComplete());
                }));
    }
}

export function taskStatusChange(taskId, status) {
    return function (dispatch) {
        dispatch(updateTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/taskStatusChange`;

        const body = {
            id: taskId,
            status: status,
        };

        return (
            Axios.post(url, body)
                .then(function (response) {
                    if (response.data.status == "started") {
                        dispatch(setLastStartedTask(response.data));
                    }
                    dispatch(updateTask(response.data));
                    dispatch(updateTaskComplete());
                })
                .catch(function (error) {
                    dispatch(updateTaskComplete());
                }));
    }
}

export function taskJoinStatusChange(taskId, status, user) {
    return function (dispatch) {
        dispatch(updateTaskInitiate());

        const body = { userId: user._id, hangoutID: taskId, status: status };

        return (
            Axios.post(`${ConfigMain.getBackendURL()}/hangoutJoinStatusChange`, body)
                .then((response) => {
                    console.log("response.data~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.dir(response.data);
                    dispatch(updateTask(response.data));
                    dispatch(updateTaskComplete());

                }).catch(function (error) {
                    dispatch(updateTaskComplete());
                }));
    }
}

export function taskLeave(taskId, user) {
    return function (dispatch) {
        dispatch(saveTaskInitiate());

        const url = `${ConfigMain.getBackendURL()}/hangoutLeave`;

        const body = {
            id: taskId,
            user: user,
        };

        return (
            Axios.post(url, body)
                .then(function (response) {
                    dispatch(saveTaskComplete());
                })
                .catch(function (error) {
                    dispatch(saveTaskComplete());
                }));
    }
}

export function hangoutAnswersSave(body) {
    return function (dispatch) {
        dispatch(updateTaskInitiate());

        return (Axios.post(`${ConfigMain.getBackendURL()}/hangoutAnswersSave`, body)
            .then((response) => {
                if (response.data && response.data._id) {
                    dispatch(updateTask(response.data._id, response.data));
                }

                dispatch(updateTaskComplete());
            })
            .catch(function (error) {
                dispatch(updateTaskComplete());
            }));
    }
}