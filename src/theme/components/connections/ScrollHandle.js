import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Spinner from '~/src/theme/components/homepage/Spinner';
class ScrollHandle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      positionY: -1,
      active: false,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const elPos = this.element.offsetTop - this.element.offsetHeight - this.element.parentElement.offsetTop
    if( elPos <= window.pageYOffset && !this.state.active) {
      this.setState({ active: true});
    }
  }

  render() {
    return <div ref={(el) => { this.element = el; } }>{this.state.active && <Spinner shown />}</div>
  }
}

export default ScrollHandle;