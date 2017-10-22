import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
 
class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <span>
                    <b>Item1</b>
                </span>
                <span>
                <b>Item2</b>
                </span>
                <span>
                <b>Item3</b>
                </span>
            </Carousel>
        );
    }
};

export default DemoCarousel;