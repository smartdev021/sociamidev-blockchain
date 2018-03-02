/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withCookies, Cookies } from 'react-cookie';

import "~/src/theme/new_ui/css/style.css"

import SignUpFormPopup from  '~/src/authentication/SignUpForm';

import ActionLink from '~/src/components/common/ActionLink'

import {
    openSignUpForm,
  } from '~/src/redux/actions/authorization'

import {Route, Switch} from 'react-router-dom' //temporarily here, remove it!!!!!!!
import Authorize from '~/src/authentication/Authorize';

//character selection
import CharacterSelection from "~/src/character-creation/CharacterSelection"
import CharacterTraitsSelection from "~/src/character-creation/TraitsSelection"
import CharacterAuthentication from "~/src/character-creation/Authentication"

import ConfigMain from '~/configs/main'

import {
    setSelectedCharacterIndex,
    setSelectedCharacterTraitsIndex,
  } from '~/src/redux/actions/characterCreation'

const SELECT_TRAITS = "SelectTraits";
const SELECT_CHARACTER = "SelectCharacter";
const SELECT_AUTH_METHOD = "SelectAuthMethod";

const CharacterCreationFlow = [
    {
        step: SELECT_TRAITS,
            data: {
                selectedIndex: 0,
        }
    },
    {
        step: SELECT_CHARACTER,
            data: {
                selectedIndex: 0,
        }
    },
    {
        step: SELECT_AUTH_METHOD
    }
];

class LandingPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        isCharacterCreationFlowActive: false,
        characterCreationState: undefined,
        characterCreationFlowStepIndex: undefined,

        characterCreationData: undefined,
    }
  }

  /*CHARACTER CREATION FLOW*/

  componentWillMount() {
      this.restoreCharacterCreation();
  }

  handleCloseCharacterCreation() {
    this.setState({isCharacterCreationFlowActive: false});
  }

  startCharacterCreation() {
    const StartFlowIndex = 0;
    this.setState({
        characterCreationState: !this.state.characterCreationState ? CharacterCreationFlow[StartFlowIndex] : this.state.characterCreationState,
        characterCreationFlowStepIndex: !this.state.characterCreationFlowStepIndex ? StartFlowIndex : this.state.characterCreationFlowStepIndex,
        isCharacterCreationFlowActive: true
    });
  }

  characterCreationNextStep(data) {
    const characterCreationFlowStepIndex = (this.state.characterCreationFlowStepIndex + 1) % CharacterCreationFlow.length;
    this.setState( {
            characterCreationState: CharacterCreationFlow[characterCreationFlowStepIndex], 
            characterCreationFlowStepIndex: characterCreationFlowStepIndex,
            characterCreationData: Object.assign({}, this.state.characterCreationData, {...data})
    });
  }

  handleSelectCharacterTraits(index) {
      this.props.setSelectedCharacterTraitsIndex(index);
  }

  handleSelectCharacter(index) {
      this.props.setSelectedCharacterIndex(index);
  }

  renderCharacterCreationForm() {
    let FormToRender = null;

    if (this.state.isCharacterCreationFlowActive && this.state.characterCreationState) {
        switch (this.state.characterCreationState.step) {
            case SELECT_TRAITS: {
                FormToRender = <CharacterTraitsSelection characterCreationState={this.state.characterCreationState} 
                  onClose={() => this.handleCloseCharacterCreation()} onNextStep={(data)=>this.characterCreationNextStep(data)}
                  onSelect={(index)=>this.handleSelectCharacterTraits(index)}
                  selectedIndex={this.props.characterCreationData.selectedTraitsIndex}
                  traitsList={this.props.listCharacterTraits}/>
                break;
            }
            case SELECT_CHARACTER: {
                FormToRender = <CharacterSelection characterCreationState={this.state.characterCreationState} 
                  onClose={() => this.handleCloseCharacterCreation()} onNextStep={(data)=>this.characterCreationNextStep(data)}
                  onSelect={(index)=>this.handleSelectCharacter(index)}
                  selectedIndex={this.props.characterCreationData.selectedCharacterIndex}
                  charactersList={this.props.listCharacters}
                  characterCreationData={this.props.characterCreationData}/>
                break;
            }
            case SELECT_AUTH_METHOD: {
                FormToRender = <CharacterAuthentication characterCreationState={this.state.characterCreationState} 
                  onClose={() => this.handleCloseCharacterCreation()}/>
                break;
            }
            default:
              break;
        }
    }

    return FormToRender;
  }

  restoreCharacterCreation() {
    const { cookies } = this.props;

    if (cookies) {
        const characterCreationSave = cookies.get("characterCreation");

        if (characterCreationSave && characterCreationSave.isInprogress) {
            this.setState({characterCreationState: characterCreationSave.state});
        }

        //const options = { path: '/', expires: Date.now() + ConfigMain.getCookiesExpirationPeriod()};
        //cookies.set(`answers_for_task_${this.state.currentTask._id}`, answersForTask, options); 
    }
  }

  /*************************/

  renderSignUpForm() {
    return (this.props.isSignUpFormOpen ? 
      <SignUpFormPopup modalIsOpen={this.props.isSignUpFormOpen} isAuthorized={this.props.isAuthorized} onCloseModal={() => this.props.onCloseSignUpModal()}
        onHandleSignUpFacebook={()=>this.props.onHandleSignUpFacebook()} onHandleSignUpLinkedIn={()=>this.props.onHandleSignUpLinkedIn()}
          pathname={this.props.pathname}/>
            : null
    );
  }

  renderRoutes() {
    return (
      <Switch>
        <Route path='/authorize' render={routeProps => <Authorize {...routeProps}{...this.props}/>} />)}/>
      </Switch>)
  }

  render() {
    return (
      <div className="wrapper">
        {this.renderSignUpForm()}
        {this.renderCharacterCreationForm()}
        {this.renderRoutes() /*This is temporary - remove it!!!!!!!!*/}
        <div className="session-header-landing">
          <div className="container">
            <div className="row">
              <div className="col-xs-6">
                <h1 className="logo"><a href="#"><img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/logo.png" alt=""/></a></h1>
              </div>
              <div className="col-xs-6 pull-right">
                <ActionLink href="#" onClick={()=> this.startCharacterCreation()} className="btn-base-landing btn-red-landing btn-login-landing">
                  Create Account</ActionLink>
                <ActionLink href="#" onClick={()=> this.props.openSignUpForm()} className="btn-base-landing btn-yellow-landing btn-login-landing">
                  Sign in</ActionLink>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="box-intro">
                  <h1 className="heading-1">Fight for the future</h1>
                  <h4 className="heading-4"> Join one of the most futuristic orders in the world</h4>
                  <p className="text-para">Welcome to Soqqle<br/>
                    Soqqle is a new gamified learning world for people to come together to
                      prepare and solve challenges to unlock the next-generation Human Renaissance.
                  </p>
                  <p>
                    <a href="#" className="btn-base-landing btn-red-landing only-line" data-toggle="modal" data-target="#token">
                      <span className="font-small">Register for</span><br/>Token Events Updates</a>
                      <a href="#" className="btn-base-landing btn-red-landing" data-toggle="modal" data-target="#alpha">
                        <span className="font-small">Register for</span> alpha</a>
                      </p>
                      <iframe width="420" height="345" id="intro-video" src="https://www.youtube.com/embed/i8PJgSclIf0">
                      </iframe>
                    </div>
                </div>

            </div>

            <div className="modal fade" id="token" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Token Events Updates</h4>
                        </div>
                        <div className="modal-body">
                            <p>The easiest way to learn and collaborate with your friends.
                                The only Blockchain powered smart social network that propels you to the forefront of humankind.</p>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="token-name" className="control-label">Name:</label>
                                    <input type="text" className="form-control" id="token-name" placeholder="Enter you name here"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="token-email" className="control-label">Email:</label>
                                    <input type="text" className="form-control" id="token-email" placeholder="Enter you email here"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="cancel" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button id="ok" type="button" className="btn btn-primary">Join us</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="alpha" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Alpha</h4>
                        </div>
                        <div className="modal-body">
                            <p>The easiest way to learn and collaborate with your friends.
                                The only Blockchain powered smart social network that propels you to the forefront of humankind.</p>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="alpha-name" className="control-label">Name:</label>
                                    <input type="text" className="form-control" id="alpha-name" placeholder="Enter you name here"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="alpha-email" className="control-label">Email:</label>
                                    <input type="text" className="form-control" id="alpha-email" placeholder="Enter you email here"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="cancel" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button id="ok" type="button" className="btn btn-primary">Join us</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-md-7">

                </div>
                <div className="col-md-5">
                    <div className="box-problem">
                        <div className="icon-format">?</div>
                        <h1 className="text-heading">PROBLEM</h1>
                        <p>A mysterious technology epidemic is surging across the world today - and
                            many will not know it until it’s too late. It’s called the future of work.
                            Bands of people must now come together to change how they learn to beat threatening technologies
                            like artificial intelligence to ensure the survival of humankind.</p>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <div className="session-mid">
        <div className="container">
            <div className="box-head">
                <h1 className="text-heading heading-border">
                    <span>Goal</span>
                </h1>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 no-padding">
                    <div className="box-seed seed-left">
                        <div className="block-capital">
                            <h4>Speed Up Human Capital Growth</h4>
                            <p>Revolutionize Learning Spaces by making it spontaneous, engaging and fun through a
                                gamification engine borrowed from online games like World of Warcraft.
                                Integrated with a Tokenized Social Network,
                                we place people at the right place, at the right time with the right people.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 no-padding">
                    <div className="box-seed seed-mid">
                        <div className="block-capital">
                            <h4>Redefine Social Circles</h4>
                            <p>Automate rich opportunities through chal- lenge-driven tasks to build and measure up social
                                reputation. Flex under- utilized expertise to hit deep moti- vations of connections to
                                lay footholds into social stardom.
                                Cast reputation gain on the "Blockchain Stone" never to be forgotten again!</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 no-padding">
                    <div className="box-seed seed-right">
                        <div className="block-capital">
                            <h4>Tokenized Learning</h4>
                            <p>At advanced levels, special abilities unlock to contribute in a tokenized world where
                                digital tokens can be earned based on growth and contributions,
                                to fire up community projects and launch power up effects like experience gains.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="session2">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="box-feature">
                            <div className="item-feature feature-1">
                                Convert Virtue Tokens to SOQQ tokens to obtain special powerup tokens to generate random
                                special effects like random progress trees, experience boosts, and more.
                            </div>
                            <div className="item-feature feature-2">
                                Unlock advanced tasks as you progress. These advanced tasks net you VIRTUE tokens,
                                used for purchase of other in-game benefits.
                            </div>
                            <div className="item-feature feature-3">
                                Complete tasks to earn virtue points to progress through your progression tree levels.
                                Levels get harder higher up.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="block-feature">
                            <div className="head-how">HOW IT WORKS</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box-feature">
                            <div className="item-feature feature-4">
                                Browse and select challenges for completion. Each challenge consist of progression
                                trees that are mix-and-matched.
                            </div>
                            <div className="item-feature feature-5">
                                See dailies, and weeklies that are open for completion
                            </div>
                            <div className="item-feature feature-6">
                                Join others in their challenges or create your own and invite others
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="session-mid2">
        <div>
            <div className="col-md-4"></div>
            <div className="col-md-3"></div>
            <div className="col-md-5">
                <div className="block-token">
                    <div className="head-token">Summary</div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <h2 className="heading-token">Dual-token mechanism</h2>
                <div className="col-md-4">
                    <div className="box-token token-1">
                        <h3>VIRT: The worker token</h3>
                        <p>Through the completion of challenge-driven tasks in the systems,
                            users get to earn get to earn Virtue (VIR) Tokens that represent
                            the value received as part of completing the learning objectives.
                            As users start going through more and more complex objectives,
                            they will unlock more unique tasks and benefits. </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="box-token token-2">
                        <h3>SOQQ: The Powerup token</h3>
                        <p>SOQQ Tokens power-up pre-defined group or individual’s experience gains like a booster pack.
                            Users can purchase these tokens through either offline methods or exchange with other users.
                        </p>
                    </div>
                </div>
                <div className="col-md-4 no-padding">
                    <div className="box-token token-3">
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="block-experience">
                <div className="col-md-9 no-padding">
                    <div className="text-intro-experience">
                        Users choose a character type that represents their personality.
                        This will define the overall experience around tasks that will be assigned.
                    </div>
                </div>
                <div className="col-md-3 no-padding"></div>

                <div className="col-md-4 col-sm-4 no-padding">
                    <div className="box-experience bg-white">
                        <h3>Realistic (Do’er)</h3>
                        <p>Prefers physical activities that re-quire skill, strength, and coordina-tion.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 no-padding">
                    <div className="box-experience bg-blue">
                        <h3>Investigative (Thinker)</h3>
                        <p>Prefers working with theory and information, thinking, organizing, and understanding.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 no-padding">
                    <div className="box-experience bg-white">
                        <h3>Artistic (Creator)</h3>
                        <p>Prefers creative, original, and un-systematic activities that allow creative expression.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 no-padding">
                    <div className="box-experience bg-blue">
                        <h3>Social (Helper)</h3>
                        <p>Prefers activities that involve help-ing, healing, or developing others.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 no-padding">
                    <div className="box-experience bg-white">
                        <h3>Enterprising (Persuader)</h3>
                        <p>Prefers competitive environments, leadership, influence, selling, and status.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 no-padding">
                    <div className="box-experience bg-blue">
                        <h3>Conventional (Organizer)</h3>
                        <p>Prefers precise, rule-regulated, or-derly, and unambiguous activities.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div className="session-mid3">
        <div className="col-md-7 no-padding"></div>
        <div className="col-md-5 no-padding">
            <div className="heading-characters">
                Characters
            </div>
        </div>

        <div className="container-fluid">

            <div className="block-item clearfix">
                <div className="row">
                    <div className="col-sm-4 col-sm-push-8 no-padding">
                        <div className="avatar-p1">
                            <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/p1.png" alt="" className="img-avatar"/>
                            <div className="btn-name btn-contact-red1">Leona</div>
                        </div>
                    </div>
                    <div className="col-sm-8 col-sm-pull-4 no-padding">
                        <div className="item-contact">
                            <div className="box-contact1 text-item">
                                <span>
                                PIE > CAKE, #YOLO, DO WHAT YOU LOVE, CLINICAL DOCTOR, SCIENCE HACKTIVIST,
                                CLONING ILLUMINATI, RESEARCH HOARDER, WELCOME TO MY WORLD
                                </span>
                            </div>

                            <div className="box-overlay overlay-red"></div>
                        </div>
                    </div>

            </div>

                <div className="row">
                    <div className="col-md-4 col-sm-4 no-padding">
                        <div className="avatar-p2">
                            <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/p2.png" alt="" className="img-avatar"/>

                            <div className="btn-name btn-contact-red2">Leo</div>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-8 no-padding">
                        <div className="item-contact">
                            <div className="box-contact2 text-item">
                                <span>
                                INTERNET OF THINGS CSAR, COOLHUNTER, BOT COACH, GADGET INNOVATOR,
                                SERIAL CLAIRVOYANT, CES TRENDSETTER, RUNS WITH SCISSORS
                                    </span>
                            </div>

                        </div>

                    </div>
            </div>
            </div>

            <div className="clearfix">
                <div className="row">
                    <div className="col-sm-4 col-sm-push-8 no-padding">
                        <div className="avatar-p1">
                            <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/p3.png" alt="" className="img-avatar"/>
                            <div className="btn-name btn-contact-pink1">Max</div>
                        </div>
                    </div>
                    <div className="col-sm-8 col-sm-pull-4 no-padding">
                        <div className="item-contact">
                            <div className="box-contact1 text-item">
                                <span>
                                DIGITAL CONTENT ACROBAT, GYM JOCK, WHAT THE WHAT, GENEROUS LOVER,
                                COFFEE IS FOR CLOSERS, BOT HYPNOTIST, CMS GEEK
                                </span>
                            </div>

                            <div className="box-overlay overlay-purple"></div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-4 col-sm-4 no-padding">
                        <div className="avatar-p2">
                            <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/p4.png" alt="" className="img-avatar"/>

                            <div className="btn-name btn-contact-pink2">Ashe</div>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-8 no-padding">
                        <div className="item-contact">
                            <div className="box-contact2 text-item">
                                <span>
                                    CHIEF MOTIVATION GOD, PUTTING OUT FIRES, CREATIVE TRENDSPOTTER, SILOCON VALLEY GYPST,
                                    PROBLEM SOLVING RULE BREAKER, VC SPECIALIST
                                </span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className="clearfix">
                <div className="row">
                    <div className="col-sm-4 col-sm-push-8 no-padding">
                        <div className="avatar-p1">
                            <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/p5.png" alt="" className="img-avatar"/>

                            <div className="btn-name btn-contact-green1">Kaye</div>
                        </div>
                    </div>

                    <div className="col-sm-8 col-sm-pull-4 no-padding">
                        <div className="item-contact">
                            <div className="box-contact1 text-item">
                                <span>
                                    SPEED DATER, STEAING YOUR INTERNETZ, INTROVERT, CHOCOLATE SNOB,
                                    SECURITY DIVA, DON"T HATE ME BECAUSE I'M BEAUTIFUL
                                </span>
                            </div>

                            <div className="box-overlay overlay-yellow"></div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-4 col-sm-4 no-padding">
                        <div className="avatar-p2">
                            <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/p6.png" alt="" className="img-avatar"/>

                            <div className="btn-name btn-contact-green2">Nelson</div>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-8 no-padding">
                        <div className="item-contact">
                            <div className="box-contact2 text-item">
                                <span>
                                    PROGRAMMING VISIONARY{'<'} BIG DATA WHISPER, WEB 4.0 SENSEI,
                                    APP PUNK, GAMING PUNDIT
                                </span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>

    <div className="session-mid4">
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-sm-push-8">
                    <h1 className="heading-system">System</h1>
                </div>
                <div className="col-sm-8 col-sm-pull-4">
                    <div className="box-system">
                        <div className="item-system block-1">
                            <h3 className="text-red">Single Player Modes</h3>
                            <p><span className="text-red">Illuminate -</span> Meant for Secret Society Acolytes</p>
                            <p><span className="text-red">Decipher -</span> Meant for Code-Breakers and Puzzle-Solvers</p>
                            <p><span className="text-red">Demystify -</span> Meant for Detectives</p>
                        </div>

                        <div className="item-system block-2">
                            <p><span className="text-red">Hangout -</span> A conversation out of curiosity and information gathering</p>
                            <p><span className="text-red">Disentangle -</span> For people who see the topics of interest as a bit of an unclear mess that they can disen-tangle</p>
                        </div>

                        <div className="item-system block-3">
                            <h3 className="text-red">Team Player Modes</h3>
                        </div>

                        <div className="item-system block-4">
                            <p><span className="text-red">Deep Dive -</span> two people seriously want to delve deep into a common topic of interest</p>
                        </div>

                        <div className="item-system block-5">
                            <p><span className="text-red">Brainstorm -</span> Storming an iron fortress feel or two brains clashing like clouds causing a lightning / thun-derstorm</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div className="footer-widget">
        <div className="container">
            <div className="row">
                <div className="box-specs">
                    <div className="item-specs">
                        <div className="col-md-3 col-sm-4">
                            <h1>Token Specs</h1>
                        </div>
                        <div className="col-md-9 col-sm-8">
                            <p>Users complete challenges to gain a token.
                                The token gives experience boosts or redeems advanced challenges.
                                It can also be used to get help from others (friends or public) to complete tasks for a personal project.
                                This gamification model creates a viral need for people to meet and learn to gain tokens.
                                Also, users will want to level faster through token usage to get alluring merchant benefits.
                            </p>
                        </div>
                    </div>

                    <div className="item-specs specs2">
                        <div className="col-md-3 col-sm-4">
                            <h1>Specs</h1>
                        </div>
                        <div className="col-md-9 col-sm-8">
                            <p>Our token sale is expected in Q2 register for our newsletter to receive updates on our project</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="session-footer">
        <div className="container">
            <img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_gamified/assets/img/logo.png" className="logo-footer" alt=""/>
        </div>
    </div>
</div>
    );
  }
}

LandingPage.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  isSignUpFormOpen: PropTypes.bool.isRequired,
  characterCreationData: PropTypes.object.isRequired,
  listCharacterTraits: PropTypes.array.isRequired,
  listCharacters: PropTypes.array.isRequired,
  setSelectedCharacterIndex: PropTypes.func.isRequired,
  setSelectedCharacterTraitsIndex: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setSelectedCharacterIndex: bindActionCreators(setSelectedCharacterIndex, dispatch),
  setSelectedCharacterTraitsIndex: bindActionCreators(setSelectedCharacterTraitsIndex, dispatch),
});

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized,
  characterCreationData: state.characterCreationData,
  listCharacterTraits: state.characterCreation.listCharacterTraits,
  listCharacters: state.characterCreation.listCharacters,
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LandingPage));