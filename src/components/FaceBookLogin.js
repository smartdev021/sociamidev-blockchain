import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FaceBookLoginComponent extends React.Component {
    
constructor (props, context) {
    super(props, context);
    this.state = {facebookResponse: ""};

    this.responseFacebook = this.responseFacebook.bind(this);
}

responseFacebook(response) {
    console.log(response);
    if (response.accessToken != "") {
        let copy = Object.assign({}, this.state, {facebookResponse: response});
        this.setState(copy);
    }
  }

  render() {
      console.log(" this.state.facebookResponse.name: " + this.state.facebookResponse.name);  
      const FaceBookButton = <FacebookLogin
      appId="829265920570128"
      autoLoad={true}
      fields="name,email,picture"
      scope="public_profile,user_friends,user_actions.books"
      callback={this.responseFacebook}
    />;

    return (
      <div>
          {FaceBookButton}
      </div>
    )
  }
}

export default FaceBookLoginComponent;