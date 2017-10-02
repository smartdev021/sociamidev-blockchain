/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

class ThemeCarouselContainer extends React.Component {
  render() {
    return (<div className="container">
		<div className="row mt centered">
			<div className="col-lg-6 col-lg-offset-3">
				<h1>Our Technology.</h1>
				<h3>Everything in one place. Simplify your search.</h3>
			</div>
		</div>
		<div className="row mt centered">
			<div className="col-lg-6 col-lg-offset-3">
				<Carousel>
					<Carousel.Item>
						<img width={900} height={500} alt="900x500" src="https://sociamibucket.s3.amazonaws.com/assets/images/p01.png"/>
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img width={900} height={500} alt="900x500" src="https://sociamibucket.s3.amazonaws.com/assets/images/p02.png"/>
						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img width={900} height={500} alt="900x500" src="https://sociamibucket.s3.amazonaws.com/assets/images/p02.png"/>
						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>			
			</div>
		</div>
  </div>
    );
  }

}

export default ThemeCarouselContainer;