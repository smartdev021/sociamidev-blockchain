/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

class SidebarLeft extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="category-left">
        <div className="item-account line-bottom clearfix">
            <div className="row">
                <div className="col-xs-3">
                    <div className="avatar">
                        <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar1.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar2.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar5.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar4.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar5.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar2.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar5.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar4.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar5.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar4.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar5.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar2.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar5.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar4.png" alt="" />
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
                                <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/avatar5.png" alt="" />
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
    );
  }
}

export default SidebarLeft;