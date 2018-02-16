/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActivityTypes from "~/src/common/ActivityTypes"

const RenderDummyFriends = false;

class HeaderTaskManager extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="head-deep">
    <div className="dropdown">
        <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="text-head">Deepdive</span>
            <Icon name="chevron-down" aria-hidden="true"></Icon>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dLabel">
            <li><a href="#">All</a></li>
            <li><a href="#">Confirmed</a></li>
            <li><a href="#">My Deepdive</a></li>
            <li><a href="#">Sent Requests</a></li>
        </ul>
    </div>
</div>
    );
  }
}

HeaderTaskManager.propTypes = {
}

export default HeaderTaskManager;