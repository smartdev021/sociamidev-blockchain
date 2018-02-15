/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import '~/src/style.css'

class MainNew extends React.Component {
    render() {
        return (
            <div className="wrapper">
    <div className="session-header">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="menu-hamburger">
                        <a href="#" className="open-menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>

                        <a href="#" className="close-menu">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </div>
                    <h1 className="logo">
                        <a href="#"><img src="assets/img/logo.png" alt=""/></a>
                    </h1>
                </div>

                <div className="col-md-6">
                    <div className="task-manager">
                        <a href="#" className="btn-base btn-yellow">Challenges Scanner</a>
                        <a href="#" className="btn-base btn-yellow">Tree Scanner</a>
                        <a href="#" className="btn-base btn-yellow">Tasks Manager</a>
                    </div>
                </div>

                <div className="col-md-3">
                    <ul className="navbar-top-links">
                        <li className="mail"><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a></li>
                        <li className="notification"><a href="#"><i className="fa fa-bell" aria-hidden="true"></i></a></li>
                        <li className="register"><a href="#"><i className="fa fa-user-plus" aria-hidden="true"></i></a></li>
                        <li className="account">
                            <a href="#" className="text-logout">
                                <i className="fa fa-user" aria-hidden="true"></i> <span>Logout</span></a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

    <div className="session-content">
        <div className="category-left">
            <div className="item-account line-bottom clearfix">
                <div className="row">
                    <div className="col-xs-3">
                        <div className="avatar">
                            <img src="assets/img/avatar1.png" alt="" />
                        </div>
                    </div>
                    <div className="col-xs-9 none-padding-right">
                        <div className="text-status">
                            Good Morning Daniel, Update your status <a href="#">Here</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="specialized">
                Android developer
            </div>

            <div className="scrollbar-inner">
                <div className="block-account">

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar2.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Annalisa</span> <span className="text-desc">connected width 3 people in her wider netword</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar5.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Matilda</span>
                                    <span className="text-desc">connected with 15 people at Yale </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar4.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">joined soqqle</span>
                                    <span className="text-friends">35 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar5.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">has completed 84% of his <a href="#">Full Stack Developer roadmap</a></span>
                                    <span className="text-friends">45 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar2.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">John</span>
                                    <span className="text-desc">needs a Java programmer <a href="#">Contact John</a></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar5.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Matilda</span>
                                    <span className="text-desc">connected with 15 people at Yale </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar4.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">joined soqqle</span>
                                    <span className="text-friends">35 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar5.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">has completed 84% of his <a href="#">Full Stack Developer roadmap</a></span>
                                    <span className="text-friends">45 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar4.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">joined soqqle</span>
                                    <span className="text-friends">35 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar5.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">has completed 84% of his <a href="#">Full Stack Developer roadmap</a></span>
                                    <span className="text-friends">45 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar2.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">John</span>
                                    <span className="text-desc">needs a Java programmer <a href="#">Contact John</a></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar5.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Matilda</span>
                                    <span className="text-desc">connected with 15 people at Yale </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar4.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">joined soqqle</span>
                                    <span className="text-friends">35 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-account clearfix">
                        <div className="row">
                            <div className="col-xs-3">
                                <div className="avatar">
                                    <img src="assets/img/avatar5.png" alt="" />
                                </div>
                            </div>
                            <div className="col-xs-9 none-padding-right">
                                <div className="text-job">
                                    <span className="text-name">Josh</span>
                                    <span className="text-desc">has completed 84% of his <a href="#">Full Stack Developer roadmap</a></span>
                                    <span className="text-friends">45 mutal friends</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div className="content-tokens">
            <div className="row">
                <div className="col-md-8 expand-deep">
                    <div className="head-deep">
                        <div className="dropdown">
                            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="text-head">Deepdive</span>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
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
                            <a href="#" className="open-expanding"><i className="fa fa-chevron-left" aria-hidden="true"></i></a>
                            <a href="#" className="close-expanding"><i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                        </div>

                        <div className="expanding expanding-mobile">
                            <a href="#" className="open-expanding"><i className="fa fa-chevron-left" aria-hidden="true"></i></a>
                            <a href="#" className="close-expanding"><i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                        </div>

                        <div className="bt-search">
                            <a href="#" className="icon-search">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </a>

                            <div className="block-search">
                                <div className="close-search">
                                    <a href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
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
        </div>

    </div>

</div>
        );
    }
}

export default MainNew;