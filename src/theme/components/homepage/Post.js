import React, { Component } from 'react';
import Moment from 'moment';
import Axios from 'axios';
import nl2br from 'nl2br';

import Spinner from '~/src/theme/components/homepage/Spinner';
import LinkPreview from '~/src/theme/components/homepage/LinkPreview';
import ConfigMain from '~/configs/main';
import { message } from 'antd';
import _ from 'lodash';

const profilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

const PostHeader = ({ author, authorName, date, userProfile }) => {
  const { _id: userId, pictureURL, firstName, lastName } = userProfile;
  const userPictureUrl = (author === userId && pictureURL) ? pictureURL : profilePic;
  const newAuthorName = (author === userId) ? firstName + " " + lastName : authorName;

  return (
    <div className="top-head">
      <div className="profile-icon">
       <img src={userPictureUrl} alt="" />
      </div>
      <span className="col-heading">{newAuthorName}</span>
      <span className="date">{Moment(date).format('DD.MM.YYYY')}</span>
     </div>
  )
}

const CommentBox = (props) => {
  return(
    <div className="input-wp">
      <div className="input-filed">
        <input type="text" name="" onChange = {(e) => props.handleChange(e, 'comment')} placeholder="Write comment..." />
        <a href="#" className="camera-icon"><i className="fa fa-camera"></i></a>
      </div>
      <div className="bot-share-btns">
        <ul>
        <li><a><div className="icon-white icon-purpal" onClick = {() => props.commentPost(props.postId)} ><i className="fa fa-paper-plane"></i></div></a></li>
          <li><a href="#"><div className="icon-white text-blue"><i className="fa fa-share"></i></div></a></li>
          <li><a href="#"><div className="icon-white icon-blue"><i className="fa fa-thumbs-up"></i></div></a></li>
        </ul>
      </div>
    </div>
  )  
}

const Reaction = (props) => {
  var comments = props.allPosts.comments;
  console.log(props.allPosts.comments)
  return(
    <div>
      <div className="likewp">
        <div className="thum-like">
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
        </div>
        <span>Anna +23 others</span>
        <span className="comments-txt">4 comments</span>
      </div>
      {
        props.allPosts.comments.length > 0 &&
        _.map(comments, (item, index) => 
          <div className="likewp post-comment">
            <span>{item.comment}</span>
          </div>
        )  
      }
    </div>
    
  )
  
}


const PostFooter = (props) => (
  <div className="bot-wp">
    <Reaction allPosts = {props.allPosts} />
    <CommentBox postId = {props.postId} commentPost = {props.commentPost} handleChange = {props.handleChange}/>
  </div>
);

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchMetaLoading: false,
      linkMeta: {},
      comment: ''
    };
    this.commentPost = this.commentPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { isContainUrl, url } = this.props;
    if (isContainUrl) this.fetchLinkMeta(url);
  }

  fetchLinkMeta(link) {
    this.setState({ isFetchMetaLoading: true });
    const linkMetaScraperEndpoint = `${ConfigMain.getBackendURL()}/metadata?url=${link}`;

    Axios.get(linkMetaScraperEndpoint)
      .then(({ data }) => {
          this.setState({ 
            linkMeta: data.meta, 
            isFetchMetaLoading: false 
          });
      })
      .catch(error => this.setState({ isFetchMetaLoading: false }));
  }

  linkSnippet() {
    const { isContainUrl } = this.props;
    return isContainUrl ? 
      <LinkPreview 
        isLoading={this.state.isFetchMetaLoading}
        meta={this.state.linkMeta}
        loader={<Spinner shown={this.state.isFetchMetaLoading} />}
      /> : '';
  }

  commentPost(id) {
    console.log("comment", id)
    const that = this;
    const postCommentData = {
      post_id: id,
      commentator_id: this.props.userProfile._id,
      commentator_name: this.props.userProfile.firstName+' '+this.props.userProfile.lastName,
      comment: this.state.comment
    };

    Axios.post(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/commentpost`, postCommentData)
      .then((response) => {
        console.log(response)
        message.success(`Comment Added!`);
        that.setState({ comment: ' ' });
      })
      .catch((error) => {
        console.log(error);
        message.error(`Something went wrong!`);
      });
  }

  handleChange(e, name) {
    if(name === 'comment'){
      this.setState({ comment: e.target.value })
    }
  }

  render() {
    const { userProfile } = this.props;
    const { _id, author, authorName, date, message } = this.props.data;
    return (
      <div className="col-box-wp">
        <div className="main-comment-box">
          <PostHeader author={author} authorName={authorName} date={date} userProfile={userProfile} />
          <p dangerouslySetInnerHTML={{ __html: nl2br(message) }} />
          { this.linkSnippet() }
          <PostFooter allPosts = {this.props.data} postId = {_id} commentPost = {this.commentPost} handleChange = {this.handleChange} />
        </div>
      </div>
    );
  }
}
