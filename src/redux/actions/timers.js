import Axios from 'axios';
import Async from 'async';
import Moment from 'moment';
import _ from 'lodash';

import ConfigMain from '~/configs/main'

import {
    PREPARE_TIMERS_IN_PROGRESS,
    PREPARE_TIMERS_COMPLETE
} from './actionTypes';


export function timersInProgress() {
    return {
        type: PREPARE_TIMERS_IN_PROGRESS
    }
}

export function timersCompleted(timers) {
    return {
        type: PREPARE_TIMERS_COMPLETE,
        data: timers
    }
}

function fetchIlluminateTimer(roadmap, userId, callback) {
    const url = `${ConfigMain.getBackendURL()}/timer?roadmapId=${roadmap._id}&type=Illuminate`;
    Axios.get(url)
        .then(timerResp => {
            var illuminateTimer = _.get(timerResp, 'data')
            const trackerUrl = `${ConfigMain.getBackendURL()}/timers/track?timerId=${_.get(illuminateTimer, '_id')}&userId=${userId}`;
            Axios.get(trackerUrl)
                .then(tracker => {
                    const illuminateTracker = _.get(tracker, 'data');
                    callback(null, {
                        roadmap,
                        timer: illuminateTimer,
                        tracker: illuminateTracker
                    })
                })
        }).catch(err => {
        // TODO
        });
}

function fetchDeepdiveTimer(roadmap, userId, callback) {
    const url = `${ConfigMain.getBackendURL()}/timer?roadmapId=${roadmap._id}&type=Deepdive`;
    Axios.get(url)
        .then(timerResp => {
            var deepdiveTimer = _.get(timerResp, 'data')
            const trackerUrl = `${ConfigMain.getBackendURL()}/timers/track?timerId=${_.get(deepdiveTimer, '_id')}&userId=${userId}`;
            Axios.get(trackerUrl)
                .then(tracker => {
                    callback(null, { roadmap, timer: deepdiveTimer, tracker: _.get(tracker, 'data') } );
                })
        }).catch(err => {
            // TODO: 
        });
}

function fetchDecodeTimer(roadmap, userId, callback) {
    const url = `${ConfigMain.getBackendURL()}/timer?roadmapId=${roadmap._id}&type=Decode`;
    Axios.get(url)
        .then(timerResp => {
            var decodeTimer = _.get(timerResp, 'data')
            const trackerUrl = `${ConfigMain.getBackendURL()}/timers/track?timerId=${_.get(decodeTimer, '_id')}&userId=${userId}`;
            Axios.get(trackerUrl)
            .then(tracker => {
                callback(null, {
                    roadmap,
                    timer: decodeTimer,
                    tracker: _.get(tracker, 'data')
                })
            })
        }).catch(err => {
            //TODO
        })
}

function findRefreshTime(timer) {
    const sgOffset = Moment().utcOffset("+08:00").startOf('day');
    let nextRefresh;

    switch (_.get(timer, 'refresh')) {
      case 'Daily':
        nextRefresh = sgOffset.add(1, 'day');
        break;
      case 'Weekly':
        nextRefresh = sgOffset.day(8);
        break;
      case 'Monthly':
        nextRefresh = sgOffset.startOf('month').add(1, 'month')
        break;
    }

    return nextRefresh.toDate();
  }

function fetchTimer(roadmap, userId, callback) { 
    Async.parallel( {
        'Illuminate': Async.apply(fetchIlluminateTimer, roadmap, userId),
        'Deepdive': Async.apply(fetchDeepdiveTimer, roadmap, userId),
        'Decode': Async.apply(fetchDecodeTimer, roadmap, userId)   
    }, (error, results) => {
      // TODO: Return the timer information for Illuminate, Deepdive and Decode for each roadmap
      callback(null, results);
    })
}

function fetchTimers(roadMaps, userId, callback) {
    let roadMapsResults = {};
    roadMaps.forEach(roadmap => {
        roadMapsResults[roadmap._id] = Async.apply(fetchTimer, roadmap, userId);
    });
    Async.parallel(
        roadMapsResults
        , (error, results) => {
            callback(null, results)
        });
}

export function prepareTimers(roadMaps, userId) {
    return function (dispatch) {
        //async action entry point
        dispatch(timersInProgress());
        if (roadMaps && roadMaps.length > 0 ) {
            fetchTimers(roadMaps, userId, (error, results) => {
                let timers = [];
                Object.getOwnPropertyNames(results).forEach( roadmapId => {
                    Object.getOwnPropertyNames(results[roadmapId]).forEach(timerType => {
                        const count = _.get(results[roadmapId][timerType], 'tracker.count', 0);
                        const quota = _.get(results[roadmapId][timerType], 'timer.quota', 0);
                        if( !count || count < quota ) {
                            timers.push({
                                name: results[roadmapId][timerType]['roadmap'].name + ' - ' + timerType,
                                date: findRefreshTime(results[roadmapId][timerType]['timer'])
                            });
                        }
                    });
                });
                dispatch(timersCompleted(timers));
            });
        } else {
            dispatch(timersCompleted([]));
        }
    }
}