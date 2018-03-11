/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';
import Axios from 'axios'
import {Icon} from 'react-fa'

import ConfigMain from '~/configs/main'

class PrivacyPolicy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      privacyPolicyData: undefined,
    }
  }

  componentWillMount() {
    Axios.get(`${ConfigMain.getBackendURL()}/privacyPolicyMin`)
    .then((result) => {
      this.setState({privacyPolicyData: result.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div id="privacy-policy-container" style={{width: "100%", backgroundColor: "#f78b1f", color: "#000000", padding: "0px 10px"}}>
        {
          this.state.privacyPolicyData ?
          <div dangerouslySetInnerHTML={{__html: this.state.privacyPolicyData}}>
          </div>
          :
          <div id="privacy-policy-spinner-container" className="text-center" style={{width: "100%", minHeight: "1000px"}}>
            <div className="text-uppercase" 
              style={{fontSize: "16px", fontWeight: "700px",  padding: "50px 0px"}}><Icon spin name="spinner"/>Loading...</div>
          </div>
        }
      </div>
    );
  }
}

export default PrivacyPolicy;