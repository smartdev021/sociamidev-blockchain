/*
  Replacement of: src/theme/ProgressionTrees.js
*/

import React, { Component } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import Skills from './Skills';

import { 
  fetchStories
} from '~/src/redux/actions/story';


const profilePic =
  'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class Story extends Component {
  constructor (props) {
    super(props);

    this.state = {
      profilePic: this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic
    };
  }

  componentWillMount() {
    this.props.fetchStories();
  }

  renderSkillBox(skills) {
    return _.map(skills, skill => <Skills key={skill._id} data={skill}/>)
  }

  render () {
    return (
      <div
        className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper stories-wrapper main-bg`}>
        <div className='row'>
          <div className='container'>
            <div className='row'>
              <div className='row'>
                <LeftNav
                  accounting={this.props.accounting}
                  userProfile={this.props.userProfile}
                  profilePic={this.state.profilePic}
                />

                <RightSection />

                <div className='col-middle ml-fixed'>
                  {this.renderSkillBox(this.props.skills)}
                  <div className='col-box-wp yellow-shadow black-bg'>
                    <p>
                      Evil villain, The Shadow Professor, has used his villainous powers to create a
                      device that steals people’s creativity. He has recently infiltrated several
                      governments and power corporations
                    </p>
                    <p className='graylight'>
                      Topics: Basic Innovation, Creativity, Government, Why Innovation Now?
                    </p>
                    <div className='row'>
                      <div className='col-sm-8'>
                        <h4>Objective: Complete 0/15 Questions</h4>
                      </div>
                      <div className='col-sm-4 text-right'>
                        <a href='#' className='btn-lavel-yellow px-15'>
                          Group <i className='fa fa-users' />
                        </a>
                      </div>
                    </div>
                    <div className='img-box-wp'>
                      <img
                        src='https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/story/stories-box-img2.jpg'
                        alt=''
                      />
                    </div>
                    <div className='fot-wp'>
                      <p className='text-uppercase'>You will receive</p>
                      <div className='row'>
                        <div className='col-md-12 col-lg-7'>
                          <ul className='bttons-right-box'>
                            <li>
                              <a href='#'>500 Exp</a>
                            </li>
                            <li>
                              <a href='#'>15 soqq</a>
                            </li>
                            <li>
                              <a href='#'>influence</a>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-12 col-lg-5'>
                          <p className='pperpal-txt'>
                            <span>Daily: 1/5 completed</span>{' '}
                            <a href='#' className='btn-join pull-right'>
                              Sign Up
                            </a>
                          </p>
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

const mapStateToProps = state => ({
	isFetchingSkills: state.skills.isFetchingSkills,
	skills: state.skills.data
});

const mapDispatchToProps = dispatch => ({
    fetchStories: bindActionCreators(fetchStories, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Story));
