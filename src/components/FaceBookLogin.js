import React from 'react';
import styles from '../css/main.css'

class FaceBookLoginComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    
    initalizeFacebookAPI() {
        window.fbAsyncInit = function() { FB.init({
                  appId: 829265920570128,
                  cookie: true,  // enable cookies to allow the server to access
                  // the session
                  xfbml: true,  // parse social plugins on this page
                  version: 'v2.5' // use version 2.1
              });
        };
        
        console.log("Loading fb api");
        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;    
            }
            
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
  
    componentDidMount() {
        this.initalizeFacebookAPI();
    }
    
    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
        });
    }
    
    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          this.testAPI();
        } else if (response.status === 'not_authorized') {
            console.log("Please log into this app.");
        } else {
            console.log("Please log into this facebook.");
        }
      }
  
    checkLoginState() {
        FB.getLoginStatus(function(response) {
          this.statusChangeCallback(response);
        }.bind(this));
    }
  
    handleFBLogin() {
          FB.login(this.checkLoginState());
    }
  
    render() {
        return (
        <div>
            <div className="fb-login-button facebook_button_login" data-max-rows="1"
               data-size="large" data-button-type="continue_with"
               data-show-faces="false" data-auto-logout-link="false"
               data-use-continue-as="false" onClick = {() => this.handleFBLogin()}>
            </div>
        </div>
        );
      }
  }

export default FaceBookLoginComponent;