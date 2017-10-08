import React from 'react'
import LinkedIn from 'react-linkedin-login'
 
export default class LoginWithLinkedin extends React.Component {
 
    constructor (props, context) {
        super(props, context);

        this.callbackLinkedIn = this.callbackLinkedIn.bind(this);
    }
 
  callbackLinkedIn ({code, redirectUri}) {
    console.log("code: " + code + "redirectUri " + redirectUri);
  }
 
  render () {
    return (
      <LinkedIn
        clientId='787asa9dt1hpsb'
        callback={this.callbackLinkedIn}
        text={this.props.text} 
        className={this.props.buttonClassName}/>
    )
  }
}
 