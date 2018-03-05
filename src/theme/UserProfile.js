/*
		author: Michael Korzun

*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import StarRatings from 'react-star-ratings';

import ConfigMain from '~/configs/main';
import { openUserProfileComplete } from '~/src/redux/actions/authorization';
import "~/src/css/newUserProfile.css";

import {
    fetchListCharacterClasses,
} from '~/src/redux/actions/characterCreation'

const tag = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/rightBarTag.png";
const friend = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/rightBarAdd-friend.png";
const question = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/rightBarQuestion.png";
const coffee = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/rightBarCoffee-cup.png";
const eyeglasses = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/rightBarEyeglasses.png";
const close = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/rightBarX.png";
const mentees = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/mentees.png";
const hangout = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/hangout.png";
const tasks = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/tasks.png";
const profilePic = "https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png";

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: this.props.userProfile.firstName,
			lastName: this.props.userProfile.lastName,
			work: 'Product Manager at Soqqle',
			from: 'Singapore | Hong Kong',
			email: this.props.userProfile.email ? this.props.userProfile.email : 'Danshen@gmail.com',
			url: 'Soqqle.com',
			tel: '+8521234567',
			tasks: 78,
			hangout: 63,
			mentees: 36,
			rating: 10,
			blogs: [
				{text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '30 minutes ago'}, 
				{text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '1 day ago'},
				{text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '2 days ago'}]
		}
	}

	componentWillMount() {
		this.props.fetchListCharacterClasses();
	}

	componentWillReceiveProps() {
		this.setState({
			firstName: this.props.userProfile.firstName,
			lastName: this.props.userProfile.lastName
		})
	}

	renderCharacter() {
		if (!this.props.userProfile || !this.props.userProfile.character || this.props.isFetchingCharacters) {
			return null;
		}

		const Character = this.props.userProfile.character;

		const CharacterClass = this.props.listCharacters[Number(this.props.userProfile.character.characterIndex)];

		return (
			<div id="userprofile-page-character-info">
			  {CharacterClass.imageURL ? <img src={CharacterClass.imageURL}/> 
			  : <img src="http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Nelson.png"/>}
			  <h2>{CharacterClass.name}</h2>
			  <h3>{Character.traitsName}</h3>
			  <h4>{Character.traitsDescription}</h4>
			</div>
		)
	}

	renderLevels() {
		const UserProgressionTrees = this.props.userProfile.progressionTrees;

		if (UserProgressionTrees && UserProgressionTrees.length > 0) {
			let ProgressionTreeLevels = this.props.userProfile.progressionTreeLevels;

			if (!ProgressionTreeLevels || ProgressionTreeLevels.length == 0) {
				UserProgressionTrees.forEach(function(progressionTree) {
					ProgressionTreeLevels.push({
						_id: progressionTree._id, name: progressionTree.name, currentLevelXP: 0, totalXP: 0, level: 0
					});
				});
			}
			else {
				UserProgressionTrees.forEach(function(progressionTree) {
					if (!ProgressionTreeLevels.find(function(progressionTreeLevel) {
						return progressionTreeLevel._id == progressionTree._id;
					})) {
						ProgressionTreeLevels.push({
							_id: progressionTree._id, name: progressionTree.name, currentLevelXP: 0, totalXP: 0, level: 0
						});
					}
				});
			}

			return (
				<div className="progressionTreeLevels">
				  <ul>
					  {
						ProgressionTreeLevels.map(function(ProgTreeLevel, i) {
							return (
							  <li key={i}>
								<span className="prog-tree-list-column">
								   {ProgTreeLevel.name}
								 </span>
								 <span className="prog-tree-list-column">
								   CurrentLevelXP: {ProgTreeLevel.currentLevelXP}
								 </span>
								 <span className="prog-tree-list-column">
								   TotalXP: {ProgTreeLevel.totalXP}
								 </span>
								 <span className="prog-tree-list-column">
								   Level: {ProgTreeLevel.level}
								 </span>
							  </li>
							);
						})
					  }
				  </ul>
				</div>
			)
		}

		return null;
	}

	render() {
		//Incorrect usage of bootstrap row col. @Michael?
		return (
			<div className="row mt center">
				<div className="col-md-11 col-sm-11">
					<div className="new-userProf-wrap">
						<div className="col-md-2 col-sm-12 new-user-padding">
							<img className="new-userProf-img" src={this.props.userProfile.pictureURL 
								? this.props.userProfile.pictureURL : profilePic} />
							<div className="new-userProf-dot new-userProf-green"></div>
						</div>
						<div className="test-wrap">
							<div className="col-md-4 col-sm-12">
								<div className="new-userProf-textWrap">
									<h4 className="new-user-name">{this.state.firstName} {this.state.lastName}</h4>
									<p className="new-user-work">{this.state.work}</p>
									<p className="new-user-text">{this.state.from}</p>
									<br/>
									<p className="new-user-text">{this.props.userProfile.email 
										? this.props.userProfile.email : "mail@example.com"}</p>
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
										<span className="new-user-rating">Rating: {this.props.userProfile.rating 
										? this.props.userProfile.rating : 0}</span>
										<StarRatings rating={this.props.userProfile.rating 
										? this.props.userProfile.rating/2 : 0} 
											isSelectable={false} isAggregateRating={true} numOfStars={ 5 } 
											starWidthAndHeight={'35px'} starSpacing={'2px'}
											starEmptyColor={"white"}
											starRatedColor={"rgb(255, 204, 0)"}/>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
						  <div className="col-lg-12">
						    {this.renderLevels()}
						  </div>
						</div>
						<div className="row">
						  <div className="col-lg-12">
						    {this.renderCharacter()}
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
							<img className="new-user-right-bar-img-X" src={close} />
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
	isFetchingCharacters: state.characterCreation.isFetchingCharacters,
	listCharacters: state.characterCreation.listCharacters,
	listCharacterTraits: state.characterCreation.listCharacterTraits,
})

const mapDispatchToProps = dispatch => ({
	fetchListCharacterClasses: bindActionCreators(fetchListCharacterClasses, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));