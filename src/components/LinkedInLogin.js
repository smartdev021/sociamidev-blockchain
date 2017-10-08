import React from 'react'
import LinkedIn from 'react-linkedin-login'
import styles from '../css/main.css'
 
export default class LoginWithLinkedin extends React.Component {
 
    constructor (props, context) {
        super(props, context);

        this.callbackLinkedIn = this.callbackLinkedIn.bind(this);
    }
 
  callbackLinkedIn ({code, redirectUri}) {
    // Login with linkedin 
  }

/*componentWillMount () {

const linkedInLib = document.createElement('script_linkedin_init');
linkedInLib.type = 'text/javascript';
linkedInLib.src="http://platform.linkedin.com/in.js";
linkedInLib.innerHTML = "api_key: LL6RxKhDAKoE1tDI";
document.body.appendChild(linkedInLib);

  const s = document.createElement('script_linkedin_button');
  s.type = 'in/Login';
  document.body.appendChild(s);
}*/
 
  render () {
    return (
      <LinkedIn
        clientId='787asa9dt1hpsb'
        callback={this.callbackLinkedIn}
        text='' 
        className='button_linkedin_large'/>
    )
  }
}
 