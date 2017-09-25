/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import Image_P01 from '../../assets/img/p01.png'
import Image_P02 from '../../assets/img/p02.png'
import Image_P03 from '../../assets/img/p03.png'

class ThemeCarouselContainer extends React.Component {
  render() {
    return (<div className="container">
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
  </div>
    );
  }

}

export default ThemeCarouselContainer;