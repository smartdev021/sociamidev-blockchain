/*
    author: Anna Kuzii
*/

import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withCookies } from 'react-cookie';
import {bindActionCreators} from "redux";
import {openSignUpForm} from '~/src/redux/actions/authorization'
import SignUpFormPopup from  '~/src/authentication/SignUpForm';
import '~/src/theme/css/landingPage.css';
import PropTypes from "prop-types";

const AboutComponent = () => {
    return (
        <div className="about-wrapper">
            <div className="top-rectangle">&nbsp;</div>
            <h2>Available now on Alpha. <span>FREE</span>.</h2>
            <p>Soqqle is a novel game that brings your heartfelt aspirations to real life.</p>
            <h3>Join quests across different roles for the #futureofwork and team up with others to
                accomplish common goals! We call this - <span>The Game For Life.<br/></span> Isn’t
                this amazing?
            </h3>
            <span className="blue-rectangle">&nbsp;</span>
            <div className="bottom-rectangle">&nbsp;</div>
        </div>
    )
};

const Banner = ({openSignUpForm}) => {
    return (
        <div className="banner-wrapper">
            <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/background-city.webp"
                alt="banner"/>
            <div>
                <section>
                    <h2>game up your passion</h2>
                    <p>Plug in for the Future. Explore a world of quests with <br/> friends and play
                        them
                        together to
                        gain glory and rewards.</p>
                </section>
                <button type="button" className="explore-button"><p>Explore Soqqle</p></button>
                <button type="button" className="sign-in-button"
                        onClick={() => openSignUpForm()}><p>Sign in</p></button>
            </div>
        </div>
    )
};

const Footer = () => {
    return (
        <footer className="footer">
            <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"/>
            <h3>Subscribe to our Newsletter</h3>
            <div><input type="email" className="mail" value="Mail"/></div>
            <button type="button" className="subscribe"><p>Subscribe</p></button>
            <ul className="info-list">
                <li>About</li>
                <li>Support</li>
                <li>Contact</li>
                <li>Press</li>
            </ul>
            <h4>&#169;2018 SOQQLE, INC. ALL RIGHTS RESERVED.<br/>
                All trademarks referenced herein are the properties of their respective owners.</h4>
            <ul className="privacy-list">
                <li>Privacy</li>
                <li>Terms</li>
            </ul>
        </footer>
    )
};

const Header = ({openMenu}) => {
    return (
        <div className="header">
            <button className="burger" onClick={openMenu}>
                <span> </span>
                <span> </span>
                <span> </span>
            </button>
            <button type="button"><p>The games</p></button>
            <button type="button"><p>Forums</p></button>
            <button type="button"><p>Markers</p></button>
            <button type="button" className="subscribe-button"><p>Subscribe</p></button>
            <button type="button" className="sign-up-button"><p>Enterprise sign up</p></button>
        </div>
    )
};

const Logo = () => {
    return (
        <div className="logo">
            <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"
                alt="logo"/>
        </div>
    )
};

const MobileMenu = ({isOpen, closeMenu}) => {
    const mobileClass = isOpen ? "mobile-menu open" : "mobile-menu close";

    return (
        <div className={mobileClass}>
            <button type="button" className="close-menu" onClick={closeMenu}>
                <span>x</span>
            </button>
            <img
                src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"/>
            <ul>
                <li>The games</li>
                <li>Forums</li>
                <li>Markets</li>
            </ul>
            <footer>
                <button type="button" className="subscribe-button"><p>Subscribe</p></button>
                <button type="button" className="sign-up-button"><p>Enterprise sign up</p></button>
            </footer>
        </div>
    )
};

const OurBlog = () => {
    return (
        <div className="our-blog">
            <h2>Our blog</h2>
            <section>
                <div className="one-news">
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/blog-1.png"/>
                    <article>
                        <p className="date">15.05.18</p>
                        <h3>Can Blockchain be Trusted with <br/> all these Wallet Vulnerabilities?
                        </h3>
                        <p>Can no news be good news in the <br/> Blockchain world?</p>
                    </article>
                </div>
                <div className="two-news">
                    <div className="top-news">
                        <img
                            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/blog-2.png"/>
                        <article>
                            <p className="date">15.05.18</p>
                            <h3>We closed our Soqqle Alpha last <br/> week — you won’t believe what
                                we got.</h3>
                            <p>Our Marvelous platform caught the eyes of <br/> everyone we demoed
                                to.</p>
                        </article>
                    </div>
                    <div className="bottom-news">
                        <img
                            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/blog-3.png"/>
                        <article>
                            <p className="date">15.05.18</p>
                            <h3>Singapore for a Blockchain Hub?</h3>
                            <p>spent 4 years in Hong Kong before moving <br/> back to Singapore. The
                                difference
                                and why? <br/> It isn’t ALL about Blockchain.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
            <button type="button" className="all-news-button"><p>See all news</p></button>
        </div>
    )
};

const SoqqleInfo = () => {
    return (
        <div className="soqqle-info">
            <h2>What is Soqqle</h2>
            <section>
                <img
                    src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/learning-course.png"
                    className="learning-course"
                    alt="drive purposeful learning"/>
                <p>Drive purposeful learning</p>
            </section>
            <section>
                <img
                    src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/combine-goals.png"
                    className="goals"
                    alt="Combine social and learning goals"/>
                <p>Combine social and learning goals</p>
            </section>
            <section>
                <img
                    src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/jorney.png"
                    className="jorney"
                    alt="Helps identify networks to join the journey"/>
                <p>Helps identify networks to join the journey</p>
            </section>
        </div>
    )
};

const TalkAboutUs = () => {
    return (
        <div className="talk-about-us">
            <h2>They talk about us</h2>
            <section className="background-section-1">
                <div>
                    <img className="avatar"
                         src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-2.png"
                         alt="avatar"/>
                    <img className="twitter"
                         src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
                         alt="twitter"/>
                </div>
                <article>
                    <h3>Pek Yun Ning</h3>
                    <p>I think the concept of a Game-Based experienceto explore a world of
                        opportunities is
                        superb. I can’t wait to hear more about and take part in the BETA!</p>
                </article>
                <img className="twitter-mobile"
                     src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
                     alt="avatar"/>
                <span className="opacity-layout"> </span>
            </section>
            <section className="main-section">
                <div>
                    <img className="avatar"
                         src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-1.png"
                         alt="avatar"/>
                    <img className="twitter"
                         src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
                         alt="twitter"/>
                </div>
                <article>
                    <h3>Pek Yun Ning</h3>
                    <p>I think the concept of a Game-Based experience <br/>to explore a world of
                        opportunities is
                        superb. <br/> I can’t wait to hear more about and take part <br/>in the
                        BETA!</p>
                </article>
                <img className="twitter-mobile"
                     src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
                     alt="avatar"/>
            </section>
            <section className="background-section-2">
                <div>
                    <img className="avatar"
                         src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/avatar-2.png"
                         alt="avatar"/>
                    <img className="twitter"
                         src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
                         alt="twitter"/>
                </div>
                <article>
                    <h3>David Avetyan</h3>
                    <p>Thank you for a great website.I like it very very <br/> much. It helped me a
                        lot.
                        Thanks a lot..Thank <br/> you for a great website.I like it very very
                        much. <br/> It
                        helped me a lot. Thanks a lot..Thank you for a great <br/> website. I like
                        it very
                        very much. It helped me a lot. <br/> Thanks a lot..</p>
                </article>
                <img className="twitter-mobile"
                     src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/twitter.png"
                     alt="avatar"/>
                <span className="opacity-layout"> </span>
            </section>
            <footer>
                <button type="button" className="left-arrow"><p>&#60;</p></button>
                <button type="button" className="right-arrow"><p>&#62;</p></button>
            </footer>
        </div>
    )
};

const VideoComponent = () => {
    return (
        <div className="video">
            <div className="top-rectangle"></div>
            <h1>Discover Soqqle</h1>
            <video height="415"
                   poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg">
                <source src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
                        type="video/mp4"/>
                <source src="https://archive.org/download/ElephantsDream/ed_hd.ogv"
                        type="video/ogg"/>
                <source src="https://archive.org/download/ElephantsDream/ed_hd.avi"
                        type="video/avi"/>
                Your browser doesn't support HTML5 video tag.
            </video>
            <button type="button" className="all-videos-button"><p>See all videos</p></button>
        </div>
    )
};


const WorkExplanation = () => {
    return (
        <div className="work-explanation">
            <h2>How it works</h2>
            <section className="select-house clearfix">
                <div className="images-wrapper">
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/select-house.png"
                        alt="select your house"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/select-house-1.png"
                        className="background-img-1"
                        alt="select your house on background"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/select-house-2.png"
                        className="background-img-2"
                        alt="select your house on background"/>
                </div>
                <div className="description">
                    <span className="blue-rectangle"> </span>
                    <h1>1</h1>
                    <h3>1. Select your house</h3>
                    <p>Join an environment where people similar to you gather and complete similar
                        tasks.
                        Develop together the same way.</p>
                    <p>There are 6 houses available in BETA.</p>
                    <a href="">Explore house &#62;</a>
                </div>
            </section>
            <section className="select-hero clearfix">
                <div className="images-wrapper">
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/hero.png"
                        alt="select a hero"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/hero-1.png"
                        className="background-img-1"
                        alt="select a hero on background"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/hero-2.png"
                        className="background-img-2"
                        alt="select a hero on background"/>
                </div>
                <div className="description">
                    <span className="blue-rectangle"> </span>
                    <h1>2</h1>
                    <h3>2. Select a Hero</h3>
                    <p>Select a hero and develop it through tasks, answering questions, solving
                        challenges
                        individually or with your friends.</p>
                    <p>There are 4 heros available in BETA.</p>
                    <a href="">Explore Heroes &#62;</a>
                </div>
            </section>
            <section className="get-reward clearfix">
                <div className="images-wrapper">
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/reward.png"
                        alt="select your house"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/reward-1.png"
                        className="background-img-1"
                        alt="get a reward on background"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/reward-2.png"
                        className="background-img-2"
                        alt="get a reward on background"/>
                </div>
                <div className="description">
                    <span className="blue-rectangle"> </span>
                    <h1>3</h1>
                    <h3>3. Get a Reward</h3>
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
                        alt="use your rewards"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/use-rewards-1.png"
                        className="background-img-1"
                        alt="use your rewards on background"/>
                    <img
                        src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/use-rewards-2.png"
                        className="background-img-2"
                        alt="use your rewards on background"/>
                </div>
                <div className="description">
                    <span className="blue-rectangle"> </span>
                    <h1>4</h1>
                    <h3>4. Use your Rewards</h3>
                    <p>SOQQ Sparks are powered by Blockchain Force. Use them to boost experience
                        gain, or
                        obtain character upgrades. </p>
                    <a href="">Explore Character Progression &#62;</a>
                </div>
            </section>
        </div>
    )
};

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    renderSignUpForm() {
        return (this.props.isSignUpFormOpen ?
                <SignUpFormPopup modalIsOpen={this.props.isSignUpFormOpen}
                                 isAuthorized={this.props.isAuthorized}
                                 onCloseModal={() => this.props.onCloseSignUpModal()}
                                 onHandleSignUpFacebook={() => this.props.onHandleSignUpFacebook()}
                                 onHandleSignUpLinkedIn={() => this.props.onHandleSignUpLinkedIn()}
                                 pathname={this.props.pathname}/>
                : null
        );
    };

    render() {
        return (
            <div className="landing-page-wrapper">
                {this.renderSignUpForm()}
                <header>
                    <Logo/>
                    <Header openMenu={this.toggle}/>
                    <Banner openSignUpForm={this.props.openSignUpForm}/>
                </header>
                <AboutComponent/>
                <main>
                    <SoqqleInfo/>
                    <WorkExplanation/>
                </main>
                <VideoComponent/>
                <main>
                    <OurBlog/>
                    <TalkAboutUs/>
                </main>
                <Footer/>
                <MobileMenu isOpen={this.state.isOpen} closeMenu={this.toggle}/>
            </div>
        );
    }
}

LandingPage.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    isSignUpFormOpen: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
    openSignUpForm: bindActionCreators(openSignUpForm, dispatch),
});


const mapStateToProps = state => ({
    isAuthorized: state.userProfile.isAuthorized,
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LandingPage));