/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import { Redirect} from 'react-router-dom'

import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

class Authorize extends React.Component {
  constructor(props) {
    super(props);
    this.redirectRequired = false;
  }

  componentWillMount () {
      
    const search = this.props.location.search;
    const params = new URLSearchParams(search);

    let query = {
        linkedInID: '',
        facebookID: ''
    };

    query.linkedInID = params.get('linkedInID');
    query.facebookID = params.get('facebookID');

    if (query.linkedInID) {
        this.props.onAuthorizeLinkedIn(query.linkedInID);
    }
    else if(query.facebookID) {
        this.props.onAuthorizeFaceBook(query.facebookID);
    }

    this.redirectRequired = true;
  }

  render() {
    let RedirectTo = null;
    
    if (this.redirectRequired) {
        this.redirectRequired = false;

        const { cookies } = this.props;

        const lastLocationSaved = cookies.get('lastLocation');

        if (lastLocationSaved) {

            let redirectLocation = lastLocationSaved.pathname;

            if (lastLocationSaved.search) {
                redirectLocation += lastLocationSaved.search;
            }

            RedirectTo = <Redirect to={redirectLocation} push />;
        }
        else {
            RedirectTo = <Redirect to="/" push />;
        }
    }

    //force redirect to /progressionTrees

    RedirectTo = <Redirect to="/progressionTrees" push />;

    return RedirectTo;
  }

}

Authorize.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
}


export default withCookies(Authorize);