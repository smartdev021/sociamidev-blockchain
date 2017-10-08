import React from 'react';

class FaceBookLoginComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};

      this.testAPI = this.testAPI.bind(this);
    }
    
    initalizeFacebookAPI() {
        window.fbAsyncInit = function() { FB.init({
                 // appId: 829265920570128,
                  appId: 375282336236539,
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
        var that = this;
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        //that.props.onResponse(response);
        });
    }
    
    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          this.testAPI();
          this.props.onResponse(response);
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
            <button className={this.props.buttonClassName} type="button" onClick = {() => this.handleFBLogin()}>{this.props.text}</button>
        );
      }
  }

export default FaceBookLoginComponent;