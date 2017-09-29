/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

class ThemeMeetTheTeamContainer extends React.Component {
  render() {
    return (<div className="container">
<div className="row mt centered">
  <div className="col-lg-6 col-lg-offset-3">
    <h1>Our Awesome Team.<br/>Design Lovers.</h1>
    <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
  </div>
</div>

<div className="row mt centered">
			<div className="col-lg-4">
				<img className="img-circle" src="https://sociamibucket.s3.amazonaws.com/assets/images/pic1.jpg" width="140" alt="pic1.jpg"/>
				<h4>Michael Robson</h4>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
			</div>

			<div className="col-lg-4">
				<img className="img-circle" src="https://sociamibucket.s3.amazonaws.com/assets/images/pic2.jpg" width="140" alt="pic2.jpg"/>
				<h4>Pete Ford</h4>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
			</div>

			<div className="col-lg-4">
				<img className="img-circle" src="https://sociamibucket.s3.amazonaws.com/assets/images/pic3.jpg" width="140" alt="pic3.jpg"/>
				<h4>Angelica Finning</h4>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
				<p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
			</div>
		</div>

</div>
    );
  }

}

export default ThemeMeetTheTeamContainer;