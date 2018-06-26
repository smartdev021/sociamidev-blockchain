/*
  author: Anna Kuzii
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { openSignUpForm } from '~/src/redux/actions/authorization';
import { fetchArticles } from '~/src/redux/actions/articles';
import Authorize from '~/src/authentication/Authorize';

const Banner = ({ openSignUpForm }) => {
  return (
    <div className="banner-wrapper">
      <img
        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/background-city.jpg"
        alt="banner" />
      <div>
        <section>
          <h2>game up your passion</h2>
          <p>Plug in for the Future. Explore a world of quests with <br /> friends and play
            them
            together to
            gain glory and rewards.</p>
        </section>
        <button type="button" className="explore-button"><p>Explore Soqqle</p></button>
        <button type="button" className="sign-in-button"
          onClick={() => openSignUpForm()}><p>Sign in</p></button>
      </div>
    </div>
  );
};

const AboutComponent = () => {
  return (
    <div className="about-wrapper">
      <div className="top-rectangle">&nbsp;</div>
      <h2>Available now on Alpha. <span>FREE</span>.</h2>
      <p>Soqqle is a novel game that brings your heartfelt aspirations to real life.</p>
      <h3>Join quests across different roles for the #futureofwork and team up with others to
        accomplish common goals! We call this - <span>The Game For Life.<br /></span> Isn’t
        this amazing?
      </h3>
      <span className="blue-rectangle">&nbsp;</span>
      <div className="bottom-rectangle">&nbsp;</div>
    </div>
  );
};

const Article = ({article}) => {
  const date = new Date(article.data.date);
  const dateStr = date.getDate() +'.'+date.getMonth()+1 + '.' + date.getFullYear();
  const title = article.openGraph.title ? article.openGraph.title : article.data.title;
  const subTitle = article.openGraph.description ? article.openGraph.description : article.data.subTitle;
  const image = article.openGraph.image ? article.openGraph.image.url : '';
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
              <img src={firstArticle.openGraph.image.url} />
              <Article article={firstArticle}></Article>
            </div> : null
        }

        <div className="two-news">
          {
            secondArticle ?
              <div className="top-news">
                <img src={secondArticle.openGraph.image.url} />
                <Article article={secondArticle}></Article>
              </div> : null
          }
          {
            thirdArticle ?
              <div className="bottom-news">
                <img src={thirdArticle.openGraph.image.url} />
                <Article article={thirdArticle}></Article>
              </div> : null
          }
        </div>
      </section>
      <button type="button" className="all-news-button"><p>See all news</p></button>
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
          <img className="twitter"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
            alt="twitter" />
        </div>
        <article>
          <h3>Pek Yun Ning</h3>
          <p>I think the concept of a Game-Based experienceto explore a world of
            opportunities is
            superb. I can’t wait to hear more about and take part in the BETA!</p>
        </article>
        <img className="twitter-mobile"
          src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
          alt="avatar" />
        <span className="opacity-layout"> </span>
      </section>
      <section className="main-section">
        <div>
          <img className="avatar"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-1.png"
            alt="avatar" />
          <img className="twitter"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
            alt="twitter" />
        </div>
        <article>
          <h3>Pek Yun Ning</h3>
          <p>I think the concept of a Game-Based experience <br />to explore a world of
            opportunities is
            superb. <br /> I can’t wait to hear more about and take part <br />in the
            BETA!</p>
        </article>
        <img className="twitter-mobile"
          src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
          alt="avatar" />
      </section>
      <section className="background-section-2">
        <div>
          <img className="avatar"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-2.png"
            alt="avatar" />
          <img className="twitter"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
            alt="twitter" />
        </div>
        <article>
          <h3>David Avetyan</h3>
          <p>Thank you for a great website.I like it very very <br /> much. It helped me a
            lot.
            Thanks a lot..Thank <br /> you for a great website.I like it very very
            much. <br /> It
            helped me a lot. Thanks a lot..Thank you for a great <br /> website. I like
            it very
            very much. It helped me a lot. <br /> Thanks a lot..</p>
        </article>
        <img className="twitter-mobile"
          src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
          alt="avatar" />
        <span className="opacity-layout"> </span>
      </section>
      <footer>
        <button type="button" className="left-arrow"><p>&#60;</p></button>
        <button type="button" className="right-arrow"><p>&#62;</p></button>
      </footer>
    </div>
  );
};

const VideoComponent = () => {
  return (
    <div className="video">
      <div className="top-rectangle"></div>
      <h1>Discover Soqqle</h1>
      <video height="415"
        poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg">
        <source src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
          type="video/mp4" />
        <source src="https://archive.org/download/ElephantsDream/ed_hd.ogv"
          type="video/ogg" />
        <source src="https://archive.org/download/ElephantsDream/ed_hd.avi"
          type="video/avi" />
        Your browser doesn't support HTML5 video tag.
      </video>
      <button type="button" className="all-videos-button"><p>See all videos</p></button>
    </div>
  );
};


const WorkExplanation = () => {
  return (
    <div className="work-explanation">
      <h2>How it works</h2>
      <section className="select-house clearfix">
        <div className="images-wrapper">
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/select-house.png"
            alt="select your house" />
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/select-house-1.png"
            className="background-img-1"
            alt="select your house on background" />
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/select-house-2.png"
            className="background-img-2"
            alt="select your house on background" />
        </div>
        <div className="description">
          <span className="blue-rectangle"> </span>
          <h1>1</h1>
          <h3>1. Select your house</h3>
          <p>Join an environment where people similar to you gather and complete similar
            tasks.
            Develop together the same way.</p>
          <p>There are 6 houses available in BETA.</p>
          <a href="/houses" className="explore-page">Explore Houses &#62;</a>
        </div>
      </section>
      <section className="select-hero clearfix">
        <div className="images-wrapper">
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/hero.png"
            alt="select a hero" />
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/hero-1.png"
            className="background-img-1"
            alt="select a hero on background" />
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/hero-2.png"
            className="background-img-2"
            alt="select a hero on background" />
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
      </section>
      <section className="play-the-game clearfix">
        <div className="images-wrapper">
          <div className="play-the-game-video"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/veQyAxuRzD0?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allowFullScreen=""></iframe></div>
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/play-the-game.png"
            alt="play the game"/>
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/play-the-game-1.png"
            className="background-img-1"
            alt="play the game on background"/>
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/play-the-game-2.png"
            className="background-img-2"
            alt="play the game on background"/>
        </div>
        <div className="description">
          <span className="blue-rectangle"> </span>
          <h1>3</h1>
          <h3>3. Play the game</h3>
          <p>Complete quests along the story of the hero
            you chose, and get method to others so form
            your own dream team.</p>
          <a href="">Explore Story &#62;</a>
        </div>
      </section>
      <section className="get-reward clearfix">
        <div className="images-wrapper">
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/reward.png"
            alt="get a reward"/>
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/reward-1.png"
            className="background-img-1"
            alt="get a reward on background" />
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/reward-2.png"
            className="background-img-2"
            alt="get a reward on background" />
        </div>
        <div className="description">
          <span className="blue-rectangle"> </span>
          <h1>4</h1>
          <h3>4. Get a Reward</h3>
          <p>Cumulate SOQQ Sparks, Achievements and Bonuses upon the completion of tasks.
            Get more
            for doing Group Tasks.</p>
          <a href="">Explore Rewards &#62;</a>
        </div>
      </section>
      <section className="use-rewards clearfix">
        <div className="images-wrapper">
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/use-rewards.png"
            alt="use your rewards" />
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/use-rewards-1.png"
            className="background-img-1"
            alt="use your rewards on background" />
          <img
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/use-rewards-2.png"
            className="background-img-2"
            alt="use your rewards on background" />
        </div>
        <div className="description">
          <span className="blue-rectangle"> </span>
          <h1>5</h1>
          <h3>5. Use your Rewards</h3>
          <p>SOQQ Sparks are powered by Blockchain Force. Use them to boost experience
            gain, or
            obtain character upgrades. </p>
          <a href="">Explore Character Progression &#62;</a>
        </div>
      </section>
    </div>
  );
};

class LandingPageContent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchArticles()
  }

  render() {
    return (
      <div className="landing-page-wrapper">
        <header>
          <Banner openSignUpForm={this.props.openSignUpForm} />
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
