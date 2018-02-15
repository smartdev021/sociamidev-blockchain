/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

class TaskManager extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="row">
                <div className="col-md-8 expand-deep">
                    <div className="head-deep">
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
                    <div className="scrollbar-inner">
                        <div className="block-deepdive">
                            <div className="scrollbar-inner">
                            <div className="row">
                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                <div className="col-deep col-sm-6">
                                    <div className="item-deep">
                                    <div className="deep-content">
                                        <h4>Comfirmed Deepdive with <a href="#" className="link-black">Alexander</a></h4>
                                        <p>Skill: Blockchain</p>
                                        <p>Time: Tomorrow, 1am</p>
                                    </div>
                                    <div className="deep-tools">
                                        <ul>
                                            <li><a href="#" className="btn-base btn-red">Reschedule</a></li>
                                            <li><a href="#" className="btn-base btn-red">Cancel</a></li>
                                            <li><a href="#" className="btn-base btn-red disabled">Start</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                              </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-4 expand-tokens">
                    <div className="block-tokens">
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
                </div>
            </div>
    );
  }
}

export default TaskManager;