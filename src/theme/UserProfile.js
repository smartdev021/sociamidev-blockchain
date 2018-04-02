/*
		author: Michael Korzun

*/

import React, { Component } from 'react';
import {Icon} from 'react-fa'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import StarRatings from 'react-star-ratings';
import qs from 'query-string';
import _ from 'lodash';

import ConfigMain from '~/configs/main';
import { openUserProfileComplete } from '~/src/redux/actions/authorization';
import "~/src/css/newUserProfile.css";

import {
	fetchListCharacterClasses,
	fetchListCharacterTraits,
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

    const queryId = qs.parse(this.props.location.search).id;

		this.state = {
			firstName: this.props.userProfile.firstName,
      lastName: this.props.userProfile.lastName,
      userID: this.props.userProfile._id,
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
				{ text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '30 minutes ago' },
				{ text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '1 day ago' },
				{ text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quisquam minima aliquam, necessitatibus repudiandae maiores.', date: '2 days ago' }],
			promoCode: "",
      promocodesUsed: [],
      isProfileLoading: queryId ? true : false
		}
	}

	componentWillMount() {
		this.props.fetchListCharacterClasses();
		this.props.fetchListCharacterTraits();

    this.updatePromoCodesUsed();
    this.setUserProfile(qs.parse(this.props.location.search).id);
	}

	componentWillReceiveProps(nextProps) {
    const queryId = qs.parse(nextProps.location.search).id;
    this.setUserProfile(queryId);
  }
  
  setUserProfile(queryId) {
    this.state.isProfileLoading = true;
    if(queryId && this.state.userID != queryId) {
			Axios(`${ConfigMain.getBackendURL()}/fetchUserProfileById?id=${queryId}`)
				.then(response => {
					this.setState({
            userID: queryId,
						firstName: _.get(response, 'data.profile.firstName', ''),
						lastName:_.get(response, 'data.profile.lastName', ''),
            pictureURL: _.get(response, 'data.profile.pictureURL', ''),
            email: _.get(response, 'data.profile.email', ''),
            hangout: _.size(_.get(response, 'data.hangouts')),
            progressionTrees: _.get(response, 'data.progressionTrees'),
            progressionTreeLevels: _.get(response, 'data.profile.progressionTreeLevels'),
						isProfileLoading: false
					})
				}).catch(err => {

				});
		} else if (queryId === this.state.userID) {
			this.setState({
        firstName: _.get(this, 'props.userProfile.firstName'),
        lastName: _.get(this, 'props.userProfile.lastName'),
        userID: _.get(this, 'props.userProfile._id'),
        pictureURL: _.get(this, 'props.userProfile.pictureURL'),
        email: _.get(this, 'props.userProfile.email', 'Danshen@gmail.com'),
        progressionTrees: this.props.userProfile.progressionTrees,
        progressionTreeLevels: this.props.userProfile.progressionTreeLevels,
        hangout: 0,
        isProfileLoading: false
      })
    }
  }

	updatePromoCodesUsed() {
		Axios.get(`${ConfigMain.getBackendURL()}/couponsGet?ownerUserId=${this.props.userProfile._id}&isUsed=${true}`)
			.then((results) => {
				this.setState({ promocodesUsed: results.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleInputPromoCode(e) {
		if (e.target.value.length === 0 || /^[0-9a-zA-Z]+$/.test(e.target.value)) {
			this.setState({ promoCode: e.target.value.toUpperCase() });
		}
	}

	handleRedeemCode() {
		if (this.state.promoCode.length == 16) {
			const body = {
				code: this.state.promoCode,
				owner: {
					id: this.props.userProfile._id,
					firstName: this.props.userProfile.firstName,
					lastName: this.props.userProfile.lastName
				}
			};

			console.log("Redeeming the code");
			console.dir(this.props.userProfile);
			console.dir(body);

			Axios.post(`${ConfigMain.getBackendURL()}/couponRedeem`, body)
				.then((result) => {
					this.setState({ promoCode: "" });
					this.updatePromoCodesUsed();
				})
				.catch((error) => {
					if (error.response && error.response.status) {
						if (error.response.status === 423) {
							if (error.response.data && error.response.data.status) {
								if (error.response.data.status == "used") {
									alert("Code already used");
								}
							}
						}
						else if (error.response.status === 404) {
							alert("Invalid code");
						}
						else if (error.response.status === 500) {
							alert("Server error");
						}
					}
				})
		}
	}

	handlePromoInputKeyPress(event) {
		if (event.key == 'Enter') {
			this.handleRedeemCode();
		}
	}

	renderCharacter() {
		if (!this.props.userProfile || !this.props.userProfile.character || this.props.isFetchingCharacters || this.props.isFetchingCharacterTraits) {
			return null;
		}

		const Character = this.props.userProfile.character;

		const CharacterClass = this.props.listCharacters[Number(this.props.userProfile.character.characterIndex)];
		const CharacterTraits = this.props.listCharacterTraits[Number(this.props.userProfile.character.traitsIndex)];

		return (
			<div id="userprofile-page-character-info">
				{CharacterClass.imageURL ? <img src={CharacterClass.imageURL} />
					: <img src="http://sociamibucket.s3.amazonaws.com/assets/character_creation/character_icons/Nelson.png" />}
				<h2>{CharacterClass.name}</h2>
				<h3>{CharacterTraits.name}</h3>
				<h4>{CharacterTraits.description}</h4>
			</div>
		)
	}

	renderTransactions() {
		if (!this.props.accounting || !this.props.accounting.data.userTransactions || this.props.accounting.data.userTransactions.length === 0) {
			return null;
		}

		return (
			<div id="userprofile-page-transactions-log">
				<h2>Transaction log</h2>
				<ul>
					{
						this.props.accounting.data.userTransactions.map((transaction, i) => {
							const Source = transaction.source.hangout ? `"${transaction.source.hangout.name}"`
								: `"${transaction.source.illuminate.name}"`;

							return (
								<li key={i}><span>{`Received: ${transaction.numTokens} ${transaction.numTokens > 1 ? "tokens" : "token"} for ${Source} `}</span></li>
							)
						})
					}
				</ul>
			</div>
		)
	}

	renderLevels() {
    const UserProgressionTrees = this.state.progressionTrees;

		if (UserProgressionTrees && UserProgressionTrees.length > 0) {
      let ProgressionTreeLevels = this.state.progressionTreeLevels;

			if (!ProgressionTreeLevels || ProgressionTreeLevels.length == 0) {
				UserProgressionTrees.forEach(function (progressionTree) {
					ProgressionTreeLevels.push({
						_id: progressionTree._id, name: progressionTree.name, currentLevelXP: 0, totalXP: 0, level: 0
					});
				});
			}
			else {
				UserProgressionTrees.forEach(function (progressionTree) {
					if (!ProgressionTreeLevels.find(function (progressionTreeLevel) {
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
							ProgressionTreeLevels.map(function (ProgTreeLevel, i) {
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

	renderPromoCodeSection() {
		return (
			<div id="userprofile-promocode-section">
				<button id="userprofile-promocode-submit" type="button" className="btn-base btn-yellow"
					onClick={() => this.handleRedeemCode()}>Redeem code</button>
				<input type="text" autoFocus={true} onKeyPress={(e) => this.handlePromoInputKeyPress(e)} maxLength={16}
					value={this.state.promoCode} onChange={(e) => this.handleInputPromoCode(e)} />

				{
					this.state.promocodesUsed.map((promocodeUsed, i) => {
						if (promocodeUsed.data && promocodeUsed.data.benefit && promocodeUsed.data.benefit.date && promocodeUsed.data.benefit.value) {
							return (
								<div key={i}>{`Promo code effective date: ${promocodeUsed.data.benefit.date} ${promocodeUsed.data.benefit.value}`}</div>
							)
						}
					})
				}
			</div>
		);
	}

	render() {
		//Incorrect usage of bootstrap row col. @Michael?
		return (
      <div>
        {
          this.state.isProfileLoading &&  
          <div className="container-fluid progress-browser-wrap">
            <div className="row">
              <div className="content-2-columns-left-title">
                Loading...<Icon spin name="spinner" />
              </div>
            </div>
          </div>
        }
        { 
          !this.state.isProfileLoading && 
          <div className="row mt center">
            <div className="col-md-11 col-sm-11">
              <div className="new-userProf-wrap">
                <div className="col-md-2 col-sm-12 new-user-padding">
                  <img className="new-userProf-img" src={this.state.pictureURL 
                  ? this.state.pictureURL : profilePic} />
                  <div className="new-userProf-dot new-userProf-green"></div>
                </div>
                <div className="test-wrap">
                  <div className="col-md-4 col-sm-12">
                    <div className="new-userProf-textWrap">
                      <h4 className="new-user-name">{this.state.firstName} {this.state.lastName}</h4>
                      <p className="new-user-work">{this.state.work}</p>
                      <p className="new-user-text">{this.state.from}</p>
                      <br />
                      <p className="new-user-text">{_.get(this, 'state.email', "mail@example.com")}</p>
                      <br />
                      <p className="new-user-text">{this.state.url}</p>
                      <br />
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
                          ? this.props.userProfile.rating / 2 : 0}
                          isSelectable={false} isAggregateRating={true} numOfStars={5}
                          starWidthAndHeight={'35px'} starSpacing={'2px'}
                          starEmptyColor={"white"}
                          starRatedColor={"rgb(255, 204, 0)"} />
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
                    {this.renderTransactions()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    {this.renderCharacter()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    {this.renderPromoCodeSection()}
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
        }
      </div>
		);
	}
}

const mapStateToProps = state => ({
	isFetchingCharacters: state.characterCreation.isFetchingCharacters,
	isFetchingCharacterTraits: state.characterCreation.isFetchingCharacterTraits,
	listCharacters: state.characterCreation.listCharacters,
	listCharacterTraits: state.characterCreation.listCharacterTraits,
	accounting: state.accounting,
})

const mapDispatchToProps = dispatch => ({
	fetchListCharacterClasses: bindActionCreators(fetchListCharacterClasses, dispatch),
	fetchListCharacterTraits: bindActionCreators(fetchListCharacterTraits, dispatch),
})

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));