import {
  FETCH_COMPANY_INITIATE,
  FETCH_COMPANY_COMPLETE
} from '~/src/redux/actions/actionTypes';

const companyInitialState = {
  company: [],
  isFetchingCompany: true
}

export function company(state = companyInitialState, action) {
  switch (action.type) {
    case FETCH_COMPANY_INITIATE:
      return {...state, isFetchingCompany: true};
    case FETCH_COMPANY_COMPLETE:
      return {...state, company: action.company, isFetchingCompany: false};
    default:
      return state;
  }
}
