import { DELETE_SKILLS_INITIATE, DELETE_SKILLS_COMPLETE, SAVE_SKILLS_INITIATE, SAVE_SKILLS_COMPLETE, FETCH_SKILLS_INITIATE, FETCH_SKILLS_COMPLETE, UPDATE_SKILLS_INITIATE, UPDATE_SKILLS_COMPLETE } from './actionTypes';

import Axios from 'axios';
import ConfigMain from '~/configs/main';

export function saveQuestionsInitiate () {
  return {
    type: SAVE_SKILLS_INITIATE,
    skills: []
  };
}

export function saveQuestionsComplete (data) {
  return {
    type: SAVE_SKILLS_COMPLETE,
    skills: data
  };
}

export function fetchQuestionsInitiate () {
  return {
    type: FETCH_SKILLS_INITIATE,
    skills: []
  };
}

export function fetchQuestionsComplete (data) {
  return {
    type: FETCH_SKILLS_COMPLETE,
    skills: data
  };
}

export function updateQuestionsInitiate() {
  return {
    type: UPDATE_SKILLS_INITIATE,
    skills: []
  }
}

export function updateQuestionsComplete(data) {
  return {
    type: UPDATE_SKILLS_COMPLETE,
    skills: data
  }
}

export function deleteQuestionsInitiate() {
  return {
    type: DELETE_SKILLS_INITIATE,
    skills: []
  }
}

export function deleteQuestionsComplete(data) {
  return {
    type: DELETE_SKILLS_COMPLETE,
    skills: data
  }
}


export function fetchQuestions () {
  return (dispatch) => {
    dispatch(fetchQuestionsInitiate());

    const url = `${ConfigMain.getBackendURL()}/questionsGetAll`;
    return Axios.get(url)
      .then((response) => {
        dispatch(fetchQuestionsComplete(response.data));
      })
      .catch(() => {
        fetchQuestionsComplete([]);
      });
  };
}

export function updateQuestion(question) {
  return function (dispatch) {
    dispatch(updateQuestionsInitiate());
    const url = `${ConfigMain.getBackendURL()}/questionUpdate`;
    return (
      Axios.post(url, question)
      .then(function(response) {
        dispatch(updateQuestionsComplete(response.data));
      })
      .catch(function(error) {
          dispatch(updateQuestionsComplete([]));
      })
    );
  }
}

export function saveQuestion(question) {
  return function (dispatch) {
    dispatch(saveQuestionsInitiate());
    const url = `${ConfigMain.getBackendURL()}/questionSave`;
    return (
      Axios.post(url, question)
      .then(function(response) {
        dispatch(saveQuestionsComplete(response.data));
      })
      .catch(function(error) {
          dispatch(saveQuestionsComplete([]));
      })
    );
  }
}

export function deleteQuestion(question_ids) {
  return function (dispatch) {
    dispatch(deleteQuestionsInitiate());
    const url = `${ConfigMain.getBackendURL()}/questionRemove`;
    return (
      Axios.delete(url, { data : { ids: question_ids }})
      .then(function(response) {
        dispatch(deleteQuestionsComplete(response.data));
      })
      .catch(function(error) {
          dispatch(deleteQuestionsComplete([]));
      })
    );
  }
}
