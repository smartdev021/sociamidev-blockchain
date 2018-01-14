/*
		author: Michael Korzun

*/

import React, { Component } from 'react';
import { Link, Button } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import profilePic from './images/profilePic.png';
import tasks from './images/tasks.png';
import hangout from './images/hangout.png';
import mentees from './images/mentees.png';
import star from './images/star.png';
import x from './images/rightBarX.png';
import eyeglasses from './images/rightBarEyeglasses.png';
import coffee from './images/rightBarCoffee-cup.png';
import question from './images/rightBarQuestion.png';
import friend from './images/rightBarAdd-friend.png';
import tag from './images/rightBarTag.png';


import ConfigMain from '~/configs/main';
import { openUserProfileComplete } from '~/src/redux/actions/authorization';
import "~/src/css/newUserProfile.css";

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: this.props.userProfile.firstName,
			lastName: this.props.userProfile.lastName,
			work: 'Product Manager at Soqqle',
			from: 'Singapore | Hong Kong',
			email: 'Danshen@gmail.com',
			url: 'Soqqle.com',
			tel: '+8521234567',
			tasks: 78,
			hangout: 63,
			mentees: 36,
			rating: 9.3,
			blogs: [
				{text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '30 minutes ago'}, 
				{text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '1 day ago'},
				{text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '2 days ago'}]
		}
	}

	componentWillReceiveProps() {
		this.setState({
			firstName: this.props.userProfile.firstName,
			lastName: this.props.userProfile.lastName
		})

	}


	render() {
		return (
			<div className="row mt center">
				<div className="col-md-11 col-sm-11">
					<div className="new-userProf-wrap">
						<div className="col-md-2 col-sm-12 new-user-padding">
							<img className="new-userProf-img" src={profilePic} />
							<div className="new-userProf-dot new-userProf-green"></div>
						</div>
						<div className="test-wrap">
							<div className="col-md-4 col-sm-12">
								<div className="new-userProf-textWrap">
									<h4 className="new-user-name">{this.state.firstName} {this.state.lastName}</h4>
									<p className="new-user-work">{this.state.work}</p>
									<p className="new-user-text">{this.state.from}</p>
									<br/>
									<p className="new-user-text">{this.state.email}</p>
									<br/>
									<p className="new-user-text">{this.state.url}</p>
									<br/>
									<p className="new-user-text">{this.state.tel}</p>
								</div>
							</div>
							<div className="col-md-1 col-sm-0 new-user-empty">
							</div>
							<div className="col-md-1 col-sm-12 new-user-padding">
								<div className="new-user-right-wrap-task">
									<img className="new-user-achiev" src={tasks} />
									<p className="new-user-text-right-block">Completed</p>
									<p className="new-user-text-tasks">{this.state.tasks}</p>
									<p className="new-user-text-right-block-line3">tasks</p>
								</div>
							</div>
							<div className="col-md-1 col-sm-12 new-user-padding">
								<div className="new-user-right-wrap-hang">
									<img className="new-user-achiev" src={hangout} />
									<p className="new-user-text-right-block new-user-text-hangout">Hangout</p>
									<p className="new-user-text-hangout-num">{this.state.hangout}</p>
									<p className="new-user-text-right-block-line3-hangout">time</p>
								</div>
							</div>
							<div className="col-md-1 col-sm-12 new-user-padding">
								<div className="new-user-right-wrap-mentees">
									<img className="new-user-mentees" src={mentees} />
									<p className="new-user-text-mentees-num">{this.state.mentees} <span className="new-user-text-mentees">mentees</span></p>
									<div className="new-user-stars-wrap">
										<span className="new-user-rating">{this.state.rating}</span><img className="new-user-star" src={star} /><img className="new-user-star" src={star} /><img className="new-user-star" src={star} /><img className="new-user-star" src={star} /><img className="new-user-star" src={star} />
									</div>
								</div>
							</div>
						</div>
						{this.state.blogs.map((item, index) => {
							return (
								<div className="row" key={index}>
									<div className="col-md-11 col-sm-12 new-user-bottom-width">
									<div className="new-user-bottom-tasks">
										<div className="new-user-bottom-tasks-text">
											<p className="new-user-work">{item.text}</p>
										</div>
										<div className="new-user-bottom-comment-date">
											<div className="new-user-bottom-comment">
												<p className="new-user-bottom-comment-text">Comment</p>
											</div>
											<div className="new-user-bottom-date">
												<p className="new-user-bottom-date-text">{item.date}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							)
						})}
					</div>
				</div>
				<div className="col-md-1 col-sm-12">
					<div className="new-user-right-bar">
						<div className="new-user-right-bar-first">
							<img className="new-user-right-bar-img-X" src={x} />
							<p>Return</p>
						</div>
						<div className="new-user-right-bar-next">
							<img className="new-user-right-bar-img" src={eyeglasses} />
							<p>Request Mentoring</p>
						</div>
						<div className="new-user-right-bar-next">
							<img className="new-user-right-bar-img" src={coffee} />
							<p>Request to Hangout</p>
						</div>
						<div className="new-user-right-bar-next">
							<img className="new-user-right-bar-img" src={question} />
							<p>What  is this?</p>
						</div>
						<div className="new-user-right-bar-next">
							<img className="new-user-right-bar-img" src={friend} />
							<p>Send a  friend request</p>
						</div>
						<div className="new-user-right-bar-next">
							<img className="new-user-right-bar-img" src={tag} />
							<p>Contact later</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));