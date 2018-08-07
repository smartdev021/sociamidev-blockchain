import {
  FETCH_COMPANY_INITIATE,
  FETCH_COMPANY_COMPLETE,
} from './actionTypes'
import Axios from 'axios';
import ConfigMain from '~/configs/main';

export function fetchCompanyInitiate() {
  return {
    type: FETCH_COMPANY_INITIATE,
    company: []
  }
}

export function fetchCompanyComplete(data) {
  return {
    type: FETCH_COMPANY_COMPLETE,
    company: data,
  }
}

export function fetchCompanyByEmail(email) {
  return function (dispatch) {
    dispatch(fetchCompanyInitiate());
    const url = `${ConfigMain.getBackendURL()}/company?email=${email}`;
    return (
      Axios.get(url)
        .then(function (response) {
          dispatch(fetchCompanyComplete(response.data));
        })
        .catch(function (error) {
          dispatch(fetchCompanyComplete([]));
        }));
  }
}
