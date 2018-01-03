import React from 'react';
import { Layout, Menu, Icon, List, Button, Avatar, Tabs, Card, Divider, Dropdown, message } from 'antd';

import "~/node_modules/antd/dist/antd.css";
import "~/src/theme/css/Privacy.css";
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class Privacy extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
    current: 'mail',
    visibilityValue:'Public',
    IsAutoAccept: 'No',
    visibilityToggle:'none',
    autoAcceptToggle:'none'
  };
  this.handleAutoAcceptMenuClick = this.handleAutoAcceptMenuClick.bind(this);
  this.handlePrivacyMenuClick = this.handlePrivacyMenuClick.bind(this);
  this.toggleAutoAccept = this.toggleAutoAccept.bind(this);
  this.toggleVisibility = this.toggleVisibility.bind(this);
}


  toggleVisibility(){
    this.state.visibilityToggle == "none" ? this.setState({visibilityToggle:"block"}) : this.setState({visibilityToggle:"none"});
  
  }

  toggleAutoAccept(){
    this.state.autoAcceptToggle == "none" ? this.setState({autoAcceptToggle:"block"}) : this.setState({autoAcceptToggle:"none"});
  }
  
  handlePrivacyMenuClick(e) {
    if(e.key == "2"){
      message.info("Visibility Changes to Private");
      this.setState({visibilityValue:"Private"});
    } else {
      message.info("Visibility Changes to Public");
      this.setState({visibilityValue:"Public"});
    }
  }

  handleAutoAcceptMenuClick(e) {
    if(e.key == "2"){
      message.info("You will NOT be able to send and receive friend requests automatically");
      this.setState({IsAutoAccept:"No"});
    } else {
      message.info("You will be able to send and receive friend requestsautomatically");
      this.setState({IsAutoAccept:"Yes"});
    }
  }

  render() {
    const visibility = (
      <Menu onClick={this.handlePrivacyMenuClick.bind(this)}>
        <Menu.Item key="1">Public</Menu.Item>
        <Menu.Item key="2">Private</Menu.Item>
      </Menu>
    );
    
    const autoAccept = (
      <Menu onClick={this.handleAutoAcceptMenuClick.bind(this)}>
        <Menu.Item key="1">Yes</Menu.Item>
        <Menu.Item key="2">No</Menu.Item>
      </Menu>
    );
    return(
    <div>
      <Layout>
        <Tabs defaultActiveKey="2">
          <TabPane tab="Account" key="1">Empty header Content</TabPane>
          <TabPane tab="Privacy" key="2">
          <Layout>
            <Sider width={200} 
             id="privacySider">
              <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="privacySettings">Privacy Settings</Menu.Item>
              </Menu>
            </Sider>
            <Layout id="privacyContent">
              <Content style={{ padding: 24, margin: 0, minHeight: 280 }}> 
              <div>
                <div id="privacyTitle">
                     Privacy Settings
                </div>
                <hr/>
                <div>
                    <label id="changeBtn" onClick = {this.toggleVisibility}>Change</label>
                    <h3>Who sees my tasks?</h3>
                    <p>Users flagged with public will see tasks from all users in the platform.  Users flagged with private wil see tasks from only friends.</p>
                    <div style={{display:this.state.visibilityToggle}}>
                        <Dropdown.Button  overlay={visibility}>
                        {this.state.visibilityValue}
                        </Dropdown.Button>
                    </div>
                    <hr/>
                </div>
                <div>
                 <label id="changeBtn" onClick = {this.toggleAutoAccept}>Change</label>
                  <h3>Auto Send / Accept Facebook Friends?</h3>
                  <p>If flagged yes, the user will automatically add all facebook friends that join the system The user will also auto accept requests from facebook friends.</p>
                  <div style={{display:this.state.autoAcceptToggle}}>
                    <Dropdown.Button  overlay={autoAccept}>
                      {this.state.IsAutoAccept}
                    </Dropdown.Button>
                  </div>
                  <hr/>
                </div>
              </div>        
              </Content>  
            </Layout>
          </Layout>
            </TabPane>
            <TabPane tab="Communications" key="3">Empty Communications Content</TabPane>
        </Tabs>   
      </Layout>
    </div>
  );
}
}

module.exports = Privacy;
