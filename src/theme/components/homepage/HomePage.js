/*
  author: Anshul Kumar
*/

import React, { Component } from 'react';
import Axios from 'axios';
import Textarea from 'react-textarea-autosize';
import ConfigMain from '~/configs/main';

import LeftNav from '~/src/theme/components/homepage/LeftNav';
import RightSection from '~/src/theme/components/homepage/RightSection';
import PostList from '~/src/theme/components/homepage/PostList';
import LinkPreview from '~/src/theme/components/homepage/LinkPreview';
import Spinner from '~/src/theme/components/homepage/Spinner';
import { findUrlInText } from '~/src/utils/UrlUtils';
import '~/src/theme/css/darkTheme.css';
import '~/src/theme/css/lightTheme.css';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';


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
    this.defaultPostLinkData = {
      isPreviewLoading: false,
      isPreviewReady: false,
      meta: {},
    };

    this.state = {
      posts: [],
      loadingPosts: true,
      postLink: this.defaultPostLinkData
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

    Axios.post(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/posts`, postData)
      .then((response) => {
        this.postInput.value = '';
        this.clearLinkPreview();
        that.fetchPosts();
      })
      .catch(error => console.log(error));
  }

  fetchPosts() {
    const feedsEndoint = `${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/feeds`;

    this.setState({ loadingPosts: true });
    Axios.get(feedsEndoint)
      .then(response => 
        this.setState({ posts: response.data, loadingPosts: false }))
      .catch(error => {});
  }

  clearLinkPreview() {
    this.setState({ postLink: this.defaultPostLinkData });
  }

  detectPostType(event) {
    const text = event.target.value;
    const foundUrlResult = findUrlInText(text);
    const currentMeta = this.state.postLink.meta;

    if (foundUrlResult.hasUrl && currentMeta) {
      const hrefLink = foundUrlResult.firstUrl;
      const currentMetaLink = currentMeta.url;
      if (!currentMetaLink || currentMetaLink !== hrefLink) {
        this.fetchLink(hrefLink);
      }

      return;
    }

    this.setState({ postLink: this.defaultPostLinkData });
  }

  

  fetchLink(link) {
    const that = this;
    const linkMetaScraperEndpoint = `${ConfigMain.getLinkScraperServiceURL()}?url=${link}`;

    this.loadingLinkPreview(true);
    Axios.get(linkMetaScraperEndpoint)
      .then(({ data }) => {
        if (data.result.status == 'OK') {
          that.showLinkPreview(data.meta);
        }
      })
      .catch(error => this.loadingLinkPreview(false));
  }

  loadingLinkPreview(isLoading) {
    this.setState({ 
      postLink: { 
        ...this.state.postLink, 
        isPreviewLoading: isLoading 
      } 
    });
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
                      inputRef={this.setPostInputRef} 
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
                    userProfile={this.props.userProfile}
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
