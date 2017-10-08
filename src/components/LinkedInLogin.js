import React from 'react'
import LinkedIn from 'react-linkedin-login'
//import styles from './styles.css'
 
export default class LoginWithLinkedin extends React.Component {
 
    constructor (props, context) {
        super(props, context);

        this.callbackLinkedIn = this.callbackLinkedIn.bind(this);
    }
 
  callbackLinkedIn ({code, redirectUri}) {
    // Login with linkedin 
  }
 
  render () {
    return (
      <LinkedIn
        clientId='787asa9dt1hpsb'
        callback={this.callbackLinkedIn}
        text='LinkedIn' />
    )
  }
}
 