/*
    author: Alexander Zolotov
    Main application class.
    It is bound to JobsList class to SearchHeader by callbacks.
    It uses JobsList to display information, received from DataProvider.
    It requests data from DataProvider, each time country or query is changed in state.
*/

import React, { Component } from 'react';
import SearchHeader from './components/SearchHeader';
import JobsList from './components/containers/JobsList';
import EventBrightItemList from './components/containers/EventBrightItemList';

import 'bootstrap/dist/css/bootstrap.css';

import './css/main.css';

//load fonts
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:300,400,900']
  }
});

//load images
import Image_Ipad_Hand from '../assets/img/ipad-hand.png'
import Image_Ser01 from '../assets/img/ser01.png'
import Image_Ser02 from '../assets/img/ser02.png'
import Image_Ser03 from '../assets/img/ser03.png'
import Image_P01 from '../assets/img/p01.png'
import Image_P02 from '../assets/img/p02.png'
import Image_P03 from '../assets/img/p03.png'
import Image_Pic1 from '../assets/img/pic1.jpg'
import Image_Pic2 from '../assets/img/pic2.jpg'
import Image_Pic3 from '../assets/img/pic3.jpg'

let DataProvider = require("./data_providers/DataProvider");
let DataProviderEventBright = require("./data_providers/event_bright/DataProvider");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.dataUpdated = this.dataUpdated.bind(this);

    this.dataUpdatedEventBright = this.dataUpdatedEventBright.bind(this);

    //TODO: refactor this place-----------------------
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //------------------------------------------------

    this.countries = {Singapore:"sg", USA:"us", China:"cn", Germany:"de", Ukraine: "ua"};

    this.initialCountry = this.countries.Singapore;
    this.initialQuery = "";

    this.state = {country: "sg", items: [], eventBrightItems: [], query : "", currentPage: "landing_page"};
  }

  //TODO: refactor this place-----------------------
  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleClick(event) {
    if (this.state.currentPage != "search_results_page" && this.state.query != "") {
      this.setState({currentPage: "search_results_page"});
    }
  }
  //------------------------------------------------

  handleCountryChange(country) {
    let copy = Object.assign({}, this.state, {country: country});
    this.setState(copy);
  }

  handleQueryChange(query) {
    //make query state change asynchronously with some delay, in order to reduce amount of data refreshes, when each symbol is typed
    let changeQueryAsync = function(query) {
      let copy = Object.assign({}, this.state, {query: query});
      this.setState(copy);
    }

    if (this.changeQUeryStateTimeoutHandle) {
      clearTimeout(this.changeQUeryStateTimeoutHandle);
    }

    this.changeQUeryStateTimeoutHandle = setTimeout(changeQueryAsync.bind(this, query), 1000)
  }

  dataUpdated(items) {
    if (typeof items !== "undefined") {
      this.state.items = [];
      
      let copy = Object.assign({}, this.state, {items: []});
      this.setState(copy);
      
      copy = Object.assign({}, this.state, {items: items});
      this.setState(copy);
    }
  }

  dataUpdatedEventBright(items) {
    if (typeof items !== "undefined") {
      this.state.eventBrightItems = [];
      
      let copy = Object.assign({}, this.state, {eventBrightItems: []});
      this.setState(copy);
      
      copy = Object.assign({}, this.state, {eventBrightItems: items});
      this.setState(copy);
    }
  }

  refreshData() {
    let copy = Object.assign({}, this.state, {items: []});
    this.setState(copy);
    
    if (this.state.query != "") {
      const PUBLISHER_ID = "4201738803816157";
      let url = "https://devfortest.000webhostapp.com/indeed_api/index.php?publisher=" + PUBLISHER_ID + "&query=" + this.state.query + "&country=" + this.state.country;
  
      DataProvider.requestApiData(url, this.dataUpdated, true);
    }
  }
  
  refreshDataEventBright() {
    let copy = Object.assign({}, this.state, {eventBrightItems: []});
    this.setState(copy);

    if (this.state.query != "") {
      let url = "https://devfortest.000webhostapp.com/eventbright_api/index.php?query=" + this.state.query;
      console.log(url);
      DataProviderEventBright.requestApiData(url, this.dataUpdatedEventBright);
    }
  }

  componentDidMount() {
    this.refreshData();
    this.refreshDataEventBright();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.country != prevState.country || this.state.query != prevState.query) {
      this.refreshData();
    }

    if (this.state.query != prevState.query) {
      let copy = Object.assign({}, this.state, {eventBrightItems: []});
      this.setState(copy);

      this.refreshDataEventBright();
    }    
  }

  render() {

    //TODO: refactor this place----------------------------------------------------------
    /*Nav Bar*/
    const NavBar = <div className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#"><b>FLATTY</b></a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Already a member?</a></li>
        </ul>
    </div>
  </div>
  </div>;

//TODO: refactor the code, split into components
  const HeadWrap = <div id="headerwrap">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h1>Make your landing page<br/>
        look really good.</h1>
        <form className="form-inline" role="form" action="#">
          <div className="form-group">
            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Key in a job or a skill you are exploring" onChange={this.handleChange}/>
          </div>
          <button type="submit" className="btn btn-warning btn-lg" onClick={this.handleClick}>Check out the future!</button>
        </form>					
      </div>
      <div className="col-lg-6">
        <img className="img-responsive" src={Image_Ipad_Hand} alt="ipad-hand.png"/>
      </div>
    </div>
  </div>
</div>;

const Container_1 = <div className="container">
<div className="row mt centered">
  <div className="col-lg-6 col-lg-offset-3">
    <h1>Your Landing Page<br/>Looks Wonderful Now.</h1>
    <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
  </div>
</div>

<div className="row mt centered">
  <div className="col-lg-4">
    <img src={Image_Ser01} width="180" alt="ser01.png"/>
    <h4>1 - Browser Compatibility</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
  </div>

  <div className="col-lg-4">
    <img src={Image_Ser02} width="180" alt="ser02.png"/>
    <h4>2 - Email Campaigns</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>

  </div>

  <div className="col-lg-4">
    <img src={Image_Ser03} width="180" alt="ser03.png"/>
    <h4>3 - Gather Your Notes</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>

  </div>
</div>
</div>;

const Container_2 = <div className="container">
		<hr/>
		<div className="row centered">
			<div className="col-lg-6 col-lg-offset-3">
				<form className="form-inline" role="form">
				  <div className="form-group">
				    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address"/>
				  </div>
				  <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
				</form>					
			</div>
			<div className="col-lg-3"></div>
		</div>
		<hr/>
	</div>;
	
  const Container_3	= <div className="container">
		<div className="row mt centered">
			<div className="col-lg-6 col-lg-offset-3">
				<h1>Flatty is for Everyone.</h1>
				<h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
			</div>
		</div>
		<div className="row mt centered">
			<div className="col-lg-6 col-lg-offset-3">
				<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
				  <ol className="carousel-indicators">
				    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
				    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
				    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
				  </ol>

				  <div className="carousel-inner">
				    <div className="item active">
				      <img src={Image_P01} alt="p01.png"/>
				    </div>
				    <div className="item">
				      <img src={Image_P02} alt="p02.png"/>
				    </div>
				    <div className="item">
				      <img src={Image_P03} alt="p03.png"/>
				    </div>
				  </div>
				</div>			
			</div>
		</div>
  </div>;
  
  const Container_4 = <div className="container">
  <hr/>
  <div className="row centered">
    <div className="col-lg-6 col-lg-offset-3">
      <form className="form-inline" role="form">
        <div className="form-group">
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address"/>
        </div>
        <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
      </form>					
    </div>
    <div className="col-lg-3"></div>
  </div>
  <hr/>
</div>;

const Container_5 = <div className="container">
<div className="row mt centered">
  <div className="col-lg-6 col-lg-offset-3">
    <h1>Our Awesome Team.<br/>Design Lovers.</h1>
    <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
  </div>
</div>

<div className="row mt centered">
			<div className="col-lg-4">
				<img className="img-circle" src={Image_Pic1} width="140" alt="pic1.jpg"/>
				<h4>Michael Robson</h4>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
			</div>

			<div className="col-lg-4">
				<img className="img-circle" src={Image_Pic2} width="140" alt="pic2.jpg"/>
				<h4>Pete Ford</h4>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
			</div>

			<div className="col-lg-4">
				<img className="img-circle" src={Image_Pic3} width="140" alt="pic3.jpg"/>
				<h4>Angelica Finning</h4>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
			</div>
		</div>

</div>;

const Container_6 = <div className="container">
		<hr/>
		<div className="row centered">
			<div className="col-lg-6 col-lg-offset-3">
				<form className="form-inline" role="form">
				  <div className="form-group">
				    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address"/>
				  </div>
				  <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
				</form>					
			</div>
			<div className="col-lg-3"></div>
		</div>
		<hr/>
		<p className="centered">Created by BlackTie.co - Attribution License 3.0 - 2013</p>
  </div>;

  let RenderData = <div>{NavBar}
  {HeadWrap}
  {Container_1}
  {Container_2}
  {Container_3}
  {Container_4}
  {Container_5}
  {Container_6}</div>;

if (this.state.currentPage == "search_results_page") {
  RenderData = <div>{NavBar}
  <div className="container search_results" >
  <div className="row mt left">
    <div className="col-lg-12">
    <SearchHeader onHandleCountryChange={(country) => this.handleCountryChange(country)} 
    onHandleQueryChange={(query) => this.handleQueryChange(query)} 
    country={this.initialCountry} query={this.state.query} countries={this.countries}/>
    {<JobsList items={this.state.items}/>}    
    {<EventBrightItemList items={this.state.eventBrightItems}/>}
    </div>
    </div>
  </div>
  {Container_6}</div>;
}
//----------------------------------------------------------

    return (
      <div>
      {RenderData}
      </div>
    );
  }
}
