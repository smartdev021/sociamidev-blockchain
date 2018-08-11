/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';
import Axios from 'axios';
import * as linkify from 'linkifyjs';
import Textarea from 'react-textarea-autosize';
import { Icon } from 'react-fa';
import ConfigMain from '~/configs/main';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import Post from '~/src/theme/components/homepage/Post';
import LinkPreview from '~/src/theme/components/homepage/LinkPreview';
import '~/src/theme/css/darkTheme.css';
import '~/src/theme/css/lightTheme.css';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

const Spinner = ({ shown }) => {
  const iconStyle = {
    color: 'white', 
    textAlign: 'center',
    width: '100%', 
    fontSize: '30px'
  };

  if (!shown) return <div />;

  return <Icon style={iconStyle} spin name="spinner" />;
};

const NoPost = ({ condition }) => {
  const spanStyle = {
    color: 'gray', 
    fontSize: '16px', 
    textAlign: 'center', 
    width: '100%', 
    display: 'inline-block' 
  };

  if (!condition) return <div />;
  return <span style={spanStyle}>There are no posts! Start making friends!</span>;
};

const PostList = ({ isLoading, posts }) => {
  if (isLoading) return <Spinner shown />;
  if (posts.length === 0) return <NoPost condition={true} />; 
    
  return (
    <div>
      { posts.map( post => <Post key={post._id} data={post} />)}
    </div>
  );
};

const PostButton = ({ onPost }) => (
  <div className="buttons-wp">
    <ul>
      <li><a href="#"><div className="icon-white"><i className="fa fa-camera"></i></div></a></li>
      <li><a href="#"><div className="icon-white"><i className="fa fa-video-camera"></i></div></a></li>
      <li><a href="#"><div className="icon-white icon-purpal" onClick={onPost}><i className="fa fa-paper-plane"></i></div></a></li>
    </ul>
  </div>
);



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loadingPosts: true,
      postLink: {
        isPreviewLoading: false,
        isPreviewReady: false,
        meta: {},
      },
    };
    this.createPost = this.createPost.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.detectPostType = this.detectPostType.bind(this);
    this.postInput = null;
    this.setPostInputRef = element => {
      this.postInput = element;
    };
  }

  createPost() {
    const that = this;
    const postData = {
      message: this.postInput.value, 
      userName: this.props.userProfile.firstName + " "+ this.props.userProfile.lastName
    };

    Axios
      .post(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/posts`, postData)
      .then((response) => {
        this.postInput.value = "";
        that.fetchPosts();
      })
      .catch(error => {
        console.log(error)
      });
  }

  fetchPosts() {
    Axios
      .get(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/feeds`)
      .then((response) => {
        this.setState({ posts: response.data, loadingPosts: false });
      })
      .catch(error => {});
  }

  detectPostType(event) {
    const text = event.target.value;
    const findLinkResult = linkify.find(text);

    const hasURL = Object.keys(findLinkResult).length > 0;

    if (hasURL) {
      const hrefLink = findLinkResult['0'].href;

      this.setState({ postLink: { isPreviewLoading: true } });
      this.fetchLink(hrefLink);
    } else {
      this.setState({ postLink: { meta: {} }});
    }
  }

  fetchLink(link) {
    const that = this;
    Axios
      .get(`${ConfigMain.getLinkScraperServiceURL()}?url=${link}`)
      .then(({ data }) => {
        if (data.result.status == 'OK') {
          that.showLinkPreview(data.meta);
        }
      })
      .catch(error => {});
  }

  showLinkPreview(meta) {
    const currentPostLinkState = { 
      isPreviewLoading: false,
      isPreviewReady: false,
      meta,
    };

    this.setState({ postLink: currentPostLinkState });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    const isFetchingPostLoading = this.state.loadingPosts;

    return (
      <div className={`${this.props.userProfile.theme.toLowerCase()}-theme-wrapper profile-wrapper main-bg`}>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="row">
                
                <LeftNav 
                  userProfile={this.props.userProfile} 
                  profilePic={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} 
                />

                <RightSection />

                <div className="col-middle ml-fixed">
                  <div className="top-box-wp">

                    <div className="profile-icon">
                      <img src={this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL : profilePic} alt="" />
                    </div>

                    <Textarea 
                      name="" 
                      onChange={this.detectPostType} 
                      ref={this.setPostInputRef} 
                      placeholder="What do you want to say..." 
                    />

                    <LinkPreview
                      isLoading={this.state.postLink.isPreviewLoading}
                      meta={this.state.postLink.meta}
                      loader={<Spinner shown={this.state.postLink.isPreviewLoading} />}
                    />
                    <PostButton onPost={this.createPost} />
                    
                  </div>
              
                  <PostList 
                    isLoading={isFetchingPostLoading} 
                    posts={this.state.posts}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
