/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActivityTypes from "~/src/common/ActivityTypes"

const RenderDummyFriends = false;

class TaskScanner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="block-tokens">
    <div className="expanding">
        <a href="#" className="open-expanding"><Icon name="chevron-left" aria-hidden="true"></Icon></a>
        <a href="#" className="close-expanding"><Icon name="chevron-right" aria-hidden="true"></Icon></a>
    </div>

    <div className="expanding expanding-mobile">
        <a href="#" className="open-expanding"><Icon name="chevron-left" aria-hidden="true"></Icon></a>
        <a href="#" className="close-expanding"><Icon name="chevron-right" aria-hidden="true"></Icon></a>
    </div>

    <div className="bt-search">
        <a href="#" className="icon-search">
            <Icon name="search" aria-hidden="true"></Icon>
        </a>

        <div className="block-search">
            <div className="close-search">
                <a href="#"><Icon name="times" aria-hidden="true"></Icon></a>
            </div>
            <div className="form-search-tokens">
                <div id="imaginary_container">
                    <div className="input-group stylish-input-group">
                        <input type="text" className="form-control input-text"  placeholder="Search" />
                        <span className="input-group-addon">
                            <button type="submit">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="box-head">
        <h1 className="text-heading heading-border">
            <span>Complete quests to earn tokens</span>
        </h1>
    </div>

    <div className="box-location clearfix">
        <div className="text-location">
            <span>Hong Kong Island</span>
        </div>
    </div>


      <div className="scrollbar-inner clearfix">
        <div className="wrapper-tokens clearfix">

            <div className="scrollbar-inner clearfix">
                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-red">
                        <h4><a href="#" className="link-red">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                        <div className="token-bottom">
                            <a href="#" className="btn-bg-red" data-toggle="modal" data-target="#token">
                                <span className="font-small">Register for</span></a>
                        </div>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-blue">
                        <h4><a href="#" className="link-blue">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-red">
                        <h4><a href="#" className="link-red">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                        <div className="token-bottom">
                            <a href="#" className="btn-bg-red" data-toggle="modal" data-target="#token">
                                <span className="font-small">Register for</span></a>
                        </div>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-blue">
                        <h4><a href="#" className="link-blue">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-red">
                        <h4><a href="#" className="link-red">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                        <div className="token-bottom">
                            <a href="#" className="btn-bg-red" data-toggle="modal" data-target="#token">
                                <span className="font-small">Register for</span></a>
                        </div>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-blue">
                        <h4><a href="#" className="link-blue">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-blue">
                        <h4><a href="#" className="link-blue">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-red">
                        <h4><a href="#" className="link-red">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                        <div className="token-bottom">
                            <a href="#" className="btn-bg-red" data-toggle="modal" data-target="#token">
                                <span className="font-small">Register for</span></a>
                        </div>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-blue">
                        <h4><a href="#" className="link-blue">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-red">
                        <h4><a href="#" className="link-red">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                        <div className="token-bottom">
                            <a href="#" className="btn-bg-red" data-toggle="modal" data-target="#token">
                                <span className="font-small">Register for</span></a>
                        </div>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-blue">
                        <h4><a href="#" className="link-blue">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                    </div>
                </div>

                <div className="col-tokens col-sm-12">
                    <div className="item-tokens tokens-red">
                        <h4><a href="#" className="link-red">Alex</a> is looking to hangout to discuss Regression Tree on
                            Monday, 15th Jan at 1pm in Central</h4>
                        <p className="text-1">Alex is in your wider network</p>
                        <p className="text-2">Earn up to 10 tokens completing this task</p>
                        <div className="token-bottom">
                            <a href="#" className="btn-bg-red" data-toggle="modal" data-target="#token">
                                <span className="font-small">Register for</span></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
    );
  }
}

TaskScanner.propTypes = {
}

export default TaskScanner;