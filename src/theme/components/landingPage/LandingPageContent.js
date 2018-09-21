/*
  author: Anna Kuzii
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Authorize from '~/src/authentication/Authorize';
import { openSignUpForm } from '~/src/redux/actions/authorization';
import { fetchArticles } from '~/src/redux/actions/articles';
import { startCharacterCreation } from '~/src/redux/actions/characterCreation';
import SubscribeThanksModal from "~/src/theme/components/SubscribeThanksModal";
import BetaFormModal from "~/src/theme/components/landingPage/BetaFormModal";
import TrailerModal from "~/src/theme/components/landingPage/TrailerModal";
import Axios from 'axios';
import ConfigMain from '~/configs/main';
import Youtube from 'react-youtube';

const soqqleEnv = process.env.SOQQLE_ENV;

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//this one is for desktop only, for mobile, there is simple input element
const EmailInput = ({ onEmailInputHide, onEmailInputSubmit, onEmailInput, email }) => {
  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      onEmailInputSubmit(email);
    }
  }

  return (
    <span>
      <span className="landing-email-input-textfield-container">
        <input value={email}
          onChange={onEmailInput}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleInputSubmit(event)
            }
          }}
          type="email" placeholder="email@example.com" autoFocus={true} />
      </span>
      <button type="submit" className="explore-button" onClick={handleInputSubmit}><p>Send</p></button>
    </span>
  )
}

const Banner = ({ openSignUpForm, startCharacterCreation, onBetaFormModalShow, onEmailInputHide, onEmailInputSubmit, onEmailInput, isEmailInputVisible, email, onTrailerModalShow }) => {
  return (
    <div className="banner-wrapper">
      <img
        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/background-city.jpg"
        alt="banner" />
      <div className="banner-content">
        <h2>{ soqqleEnv === 'production' ? 'SIGN UP FOR BETA' : 'CONNECT AND UNITE UP' }</h2>
        <p>Plug in for the Future. Explore a world of quests with friends and play them together to gain glory and rewards</p>
        {
          soqqleEnv === 'production' ?
          <a className="btn-top" onClick={onBetaFormModalShow}>Sign up now!</a>
          :
          <Link to="/characterCreation" className="btn-top" onClick={() => startCharacterCreation() }>
            Explore Soqqle
          </Link>
        }
        {
          soqqleEnv === 'production' ?
          <span className="col-md-12"><a className="btn-bottom" onClick={onTrailerModalShow}>Trailer</a></span>
          :
          <span className="col-md-12"><a className="btn-bottom" onClick={() => openSignUpForm()}>Already have an account</a></span>
        }
        {/* <section>
          {
            soqqleEnv === 'production' ?
            <h2>sign up for beta</h2>:
            <h2>game up your passion</h2>
          }
          <p>Plug in for the Future. Explore a world of quests with <br /> friends and play
            them
            together to
            gain glory and rewards.</p>
        </section>
        {
          soqqleEnv === 'production' ?
          <button type="button" className="explore-button" onClick={onBetaFormModalShow}>
            <p>Sign up now!</p>
          </button>
          :
          <Link to="/characterCreation" className="explore-button" onClick={() => startCharacterCreation() }>
            <p>Explore Soqqle</p>
          </Link>
        }
        {
          soqqleEnv === 'production' ?
          <button type="button" className="sign-in-button"
            onClick={onTrailerModalShow}>
            <p>Trailer</p>
          </button> 
          :
          <button type="button" className="sign-in-button"
            onClick={() => openSignUpForm()}>
            <p>Sign in</p>
          </button>
        } */}
      </div>
    </div>
  );
};

const AboutComponent = () => {
  return (
    <div className="about-wrapper second-section-bg">
      <h2>Available now on Alpha. <span>FREE</span>.</h2>
      <p>Soqqle is a novel game that brings your heartfelt aspirations to real life.</p>
      <h3>Join quests across different roles for the #futureofwork and team up with others to
        accomplish common goals! We call this - <span>The Game For Life.<br /></span> Isn’t
        this amazing?
      </h3>
    </div>
  );
};

const Article = ({article}) => {
  const published_time = article.openGraph.published_time ? new Date(article.openGraph.published_time) : new Date(article.data.date)
  const date = new Date(published_time);
  const dateStr = date.getDate() +'.'+ (date.getMonth()+1).toString() + '.' + date.getFullYear();
  const title = article.openGraph.title ? article.openGraph.title : article.data.title;
  const subTitle = article.openGraph.description ? article.openGraph.description : article.data.subTitle;
  return (
      <article>
        <p className="date">{dateStr}</p>
        <h3><a href={article.data.urlLink} target="_blank">{title}</a></h3>
        <p>{subTitle}</p>
      </article>
  )
}

const OurBlog = (props) => {
  const article = {
    data: {
      title: '',
      subTitle: '',
      date: new Date(),
      urlLink: '',
    },
    jsonLd: {},
    general: {},
    openGraph: {
      image: {
        url: ''
      }
    }
  }
  let firstArticle = article
  let secondArticle = article
  let thirdArticle = article
  if(props.articles) {
    firstArticle = props.articles.length > 0 ? props.articles[0] : article;
    secondArticle = props.articles.length > 1 ? props.articles[1] : article;
    thirdArticle = props.articles.length > 2 ? props.articles[2] : article;
  }
  return (
    <div className="our-blog">
      <h2>Our blog</h2>
      <section>
        {
          firstArticle ?
            <div className="one-news">
              <div className="overlay"></div>
              <img src={firstArticle.openGraph.image.url} />
              <Article article={firstArticle}></Article>
            </div> : null
        }

        <div className="two-news">
          {
            secondArticle ?
              <div className="top-news">
                <div className="overlay"></div>
                <img src={secondArticle.openGraph.image.url} />
                <Article article={secondArticle}></Article>
              </div> : null
          }
          {
            thirdArticle ?
              <div className="bottom-news">
                <div className="overlay"></div>
                <img src={thirdArticle.openGraph.image.url} />
                <Article article={thirdArticle}></Article>
              </div> : null
          }
        </div>
      </section>
      <button type="button" className="btn"><p>See all news</p></button>
    </div>
  );
};

const SoqqleInfo = () => {
  return (
    <div className="soqqle-info">
      <h2>What is Soqqle</h2>
      <section>
        <img
          src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/learning-course.png"
          className="learning-course"
          alt="drive purposeful learning" />
        <p>Drive purposeful learning</p>
      </section>
      <section>
        <img
          src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/combine-goals.png"
          className="goals"
          alt="Combine social and learning goals" />
        <p>Combine social and learning goals</p>
      </section>
      <section>
        <img
          src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/jorney.png"
          className="jorney"
          alt="Helps identify networks to join the journey" />
        <p>Helps identify networks to join the journey</p>
      </section>
    </div>
  );
};

const TalkAboutUs = () => {
  return (
    <div className="talk-about-us">
      <h2>They talk about us</h2>
      <section className="background-section-1">
        <div>
          <img className="avatar"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-2.png"
            alt="avatar" />
        </div>
        <article>
          <h4>advertiser</h4>
          <h3>Pek Yun Ning</h3>
          <p>A new way to be connected to the gamer to showcase brands better. Thats cool.</p>
        </article>
      </section>
      <section className="main-section">
        <div>
          <img className="avatar"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-1.png"
            alt="avatar" />
        </div>
        <article>
          <h4>owner</h4>
          <h3>Daniel Shen</h3>
          <p>The Gamer's interests and well-being is our key goal, this may help to prove it.</p>
        </article>
      </section>
      <section className="background-section-2">
        <div>
          <img className="avatar"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-2.png"
            alt="avatar" />
        </div>
        <article>
          <h4>broadcaster</h4>
          <h3>David Avetyan</h3>
          <p>If gamers can be more excited and engaged, more fans will come onboard.</p>
        </article>
      </section>
      <footer>
        <a href="#"></a>
        <a href="#" className="active"></a>
        <a href="#"></a>
      </footer>
    </div>
  );
};

const VideoComponent = () => {
  return (
    <div className="video">
      <h1>Discover Soqqle</h1>
      <div className="video-box-home">
        <div className="img-box">
          <Youtube
            videoId="GN4XqcrfAWY"
            id="GN4XqcrfAWY"
            opts={
              {
                width: "740",
                height: "415",
                frameborder: "0",
                allow: "autoplay; encrypted-media",
                allowfullscreen: true
              }
            }
            onPlay={()=> mixpanel.track('View Video')}
          />
        </div>
        <a href="#" className="video-box-home btn-video">See all videos <span><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/video-btn-icon.png" alt="" /></span></a>
      </div>
    </div>
  );
};

const WorkExplanation = () => {
  return (
    <div className="work-explanation">
      <h2>How it works</h2>
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
          <li data-target="#myCarousel" data-slide-to="3"></li>
          <li data-target="#myCarousel" data-slide-to="4"></li>
        </ol>

        <div className="carousel-inner">
          <div className="item active">
            <div className="select-house clearfix">
              <div className="images-wrapper"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/select-house.png" alt="select your house" /></div>
              <div className="description">
                <span className="blue-rectangle"> </span>
                <h1>1</h1>
                <h3>1. Select your house</h3>
                <p>Join an environment where people similar to you gather and complete similar tasks. Develop together the same way.</p>
                <p>There are 6 houses available in BETA.</p>
                <a href="/houses" className="explore-page">Explore Houses &gt;</a>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="select-house clearfix">
              <div className="images-wrapper">
                <img
                  src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/hero.png"
                  alt="select a hero" />
              </div>
              <div className="description">
                <span className="blue-rectangle"> </span>
                <h1>2</h1>
                <h3>2. Select a Hero</h3>
                <p>Select a hero and develop it through tasks, answering questions, solving
                  challenges
                  individually or with your friends.</p>
                <p>There are 4 heros available in BETA.</p>
                <a href="/heroes" className="explore-page">Explore Heroes &#62;</a>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="select-house clearfix">
              <div className="images-wrapper">
                <div className="play-the-game-video">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/veQyAxuRzD0?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allowFullScreen=""></iframe>
                </div>
                {/* <img
                  src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/play-the-game.png"
                  alt="play the game"/> */}
              </div>
              <div className="description">
                <span className="blue-rectangle"> </span>
                <h1>3</h1>
                <h3>3. Play the game</h3>
                <p>Complete quests along the story of the hero
                  you chose, and get method to others so form
                  your own dream team.</p>
                <a href="" className="explore-page">Explore Story &#62;</a>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="select-house clearfix">
              <div className="images-wrapper">
                <img
                  src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/reward.png"
                  alt="get a reward"/>
              </div>
              <div className="description">
                <span className="blue-rectangle"> </span>
                <h1>4</h1>
                <h3>4. Get a Reward</h3>
                <p>Cumulate SOQQ Sparks, Achievements and Bonuses upon the completion of tasks.
                  Get more
                  for doing Group Tasks.</p>
                <a href="" className="explore-page">Explore Rewards &#62;</a>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="select-house clearfix">
              <div className="images-wrapper">
                <img
                  src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/use-rewards.png"
                  alt="use your rewards" />
              </div>
              <div className="description">
                <span className="blue-rectangle"> </span>
                <h1>5</h1>
                <h3>5. Use your Rewards</h3>
                <p>SOQQ Sparks are powered by Blockchain Force. Use them to boost experience
                  gain, or
                  obtain character upgrades. </p>
                <a href="" className="explore-page">Explore Character Progression &#62;</a>
              </div>
            </div>
          </div>

        </div>

        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
          <span className="glyphicon fa fa-angle-left"></span>
        </a>
        <a className="right carousel-control" href="#myCarousel" data-slide="next">
          <span className="glyphicon fa fa-angle-right"></span>
        </a>
      </div>
    </div>
  );
};

class LandingPageContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isBetaFormModalVisible: false, isTrailerModalVisible: false, email: "", isSubscriptionModalVisible: false,};
  }

  componentWillMount() {
    this.props.fetchArticles()
  }

  //mailerlite subscribe
  handleEmailInputShow(show) {
    this.setState({ isEmailInputVisible: show });
  }

  handleonBetaFormModalShow(show) {
    if (show) {
      mixpanel.track("Sign Up Beta");
    }
    this.setState({ isBetaFormModalVisible: show });
  }
  
  handleonTrailerModalShow(show) {
    this.setState({ isTrailerModalVisible: show });
  }

  handleEmailInputSubmit(value) {
    if (value) {
      const BETA_SIGN_UP_ID = 10186414;
      const body = { groupId: BETA_SIGN_UP_ID, name: "n/a", email: value };
      mixpanel.track("Sign Up Beta - submit")
      Axios.post(`${ConfigMain.getBackendURL()}/addSubscriberToGroup`, body)
        .then((response) => {
        })
        .catch(error => {
        });
      this.setState({isBetaFormModalVisible: false, isSubscriptionModalVisible: true });
    }
  }

  handleEmailInput(event) {
    this.setState({ email: event.target.value });
  }

  handleCloseSubscribeThankYouModal() {
    this.setState({ isSubscriptionModalVisible: false });
  }

  render() {
    return (
      <div className="landing-page-wrapper">
        <header>
          <SubscribeThanksModal isVisible={this.state.isSubscriptionModalVisible} email={this.state.email}
            closeSubscribeThankYouModal={() => this.handleCloseSubscribeThankYouModal()} />
          <BetaFormModal isVisible={this.state.isBetaFormModalVisible} email={this.state.email}
            closeSubscribeThankYouModal={() => this.handleCloseSubscribeThankYouModal()} 
            onBetaFormModalHide={() => this.handleonBetaFormModalShow(false)}
            onEmailInput={(event) => { this.handleEmailInput(event) }}
            email={this.state.email}
            onEmailInputSubmit={value=> {this.handleEmailInputSubmit(value)}}/>
          <TrailerModal isVisible={this.state.isTrailerModalVisible}
            onTrailerModalHide={() => this.handleonTrailerModalShow(false)}
          />
          <Banner openSignUpForm={this.props.openSignUpForm}
            startCharacterCreation={this.props.startCharacterCreation}
            onEmailInputSubmit={(value) => { this.handleEmailInputSubmit(value) }}
            isEmailInputVisible={this.state.isEmailInputVisible}
            onTrailerModalShow={() => this.handleonTrailerModalShow(true)}
            onBetaFormModalShow={() => this.handleonBetaFormModalShow(true)}
          />
        </header>
        <AboutComponent />
        <main>
          <SoqqleInfo />
          <WorkExplanation />
        </main>
        <VideoComponent />
        <main>
          <OurBlog articles={this.props.articles} />
          <TalkAboutUs />
        </main>
      </div>
    );
  }
}

LandingPageContent.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  isSignUpFormOpen: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
  fetchArticles: bindActionCreators(fetchArticles, dispatch)
});


const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized,
  articles: state.articles.articles
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LandingPageContent));
