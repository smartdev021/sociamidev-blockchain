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
  var comments = props.comments;
  return(
    <div className="input-wp">
      <div className="input-filed">
        <input type="text" name="" value = {props.state.comment} onChange = {(e) => props.handleChange(e, 'comment')} placeholder="Write comment..." />
        <a href="#" className="camera-icon"><i className="fa fa-camera"></i></a>
      </div>
      <div className="bot-share-btns">
        <ul>
        <li><a><div className="icon-white icon-purpal" onClick = {() => props.commentPost(props.postId)} ><i className="fa fa-paper-plane"></i></div></a></li>

        </ul>
      </div>
      {
        comments.length > 0 &&
        _.map(comments, (item, index) =>  {
          return(
            <div key={index} >
            {
              index < 2 
              ?
              <div className="comments">
                <div className="top-head">
                <div className="profile-icon">
                 <img src={item.profileUrl} alt="" />
                </div>
                <span className="col-heading">{item.commentator_name}</span>
               </div>
                <div className="input-filed">
                   <input type="text" name="comment" readOnly value={item.comment}/>
                </div>
                <div className="bot-share-btns">
                  <ul>
                    {
                      (item.like.length > 0)
                      ?
                      <li><a><div className="text-blue" onClick = {() => props.commentLike(props.postId, item._id)} ><i className="fa fa-heart"></i></div></a></li>
                      :
                      <li><div className="text-blue" ><i className="fa fa-heart"></i></div></li>
                    }
                  </ul>
                </div>
              </div>
              :
              <div>
                {
                  props.state.showComments === true 
                  ?
                  <div className="comments">
                    <div className="top-head">
                    <div className="profile-icon">
                     <img src={item.profileUrl} alt="" />
                    </div>
                    <span className="col-heading">{item.commentator_name}</span>
                   </div>
                    <div className="input-filed">
                       <input type="text" name="comment" readOnly value={item.comment}/>
                    </div>
                    <div className="bot-share-btns">
                      <ul>
                        {
                          (item.like.length > 0)
                          ?
                          <li><a><div className="text-blue" onClick = {() => props.commentLike(props.postId, item._id)} ><i className="fa fa-heart"></i></div></a></li>
                          :
                          <li><div className="text-blue" onClick = {() => props.commentLike(props.postId, item._id)} ><i className="fa fa-heart"></i></div></li>
                        }
                      </ul>
                    </div>
                  </div>
                  :
                  <div>
                    {
                      index === 2 &&
                      <div className="comments" style={{ textAlign: "center", color: "#9a4da6" }} onClick = { () => props.viewMore() }> View more comments </div>
                    }
                  </div>                 
                }
              </div>
            }            
            </div>
            )
            })  
      }
    </div>
  )  
}

const Reaction = (props) => {
  return(
    <div>
      <div className="likewp">
        <div className="thum-like">
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
        </div>
        <span>Anna +23 others</span>
        <span className="comments-txt">4 comments</span>
      </div>
    </div>
    
  )
  
}


const PostFooter = (props) => (
  <div className="bot-wp">
    <Reaction  />
    <CommentBox state = { props.state } comments = {props.comments} postId = {props.postId} commentLike = {props.commentLike} viewMore = {props.viewMore} commentPost = {props.commentPost} handleChange = {props.handleChange}/>
  </div>
);

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchMetaLoading: false,
      linkMeta: {},
      comment: '',
      posts: [],
      comments: [],
      showComments: false
    };
    this.commentPost = this.commentPost.bind(this);
    this.commentLike = this.commentLike.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.viewMore = this.viewMore.bind(this);
  }

  componentDidMount() {
    const { isContainUrl, url } = this.props;
    if (isContainUrl) this.fetchLinkMeta(url);
  }

  componentWillMount(){
    this.setState({ posts: this.props.data, comments: this.props.data.comments })
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
    const that = this;
    const postCommentData = {
      post_id: id,
      commentator_id: this.props.userProfile._id,
      commentator_name: this.props.userProfile.firstName+' '+this.props.userProfile.lastName,
      profilePic: this.props.userProfile.pictureURL,
      comment: this.state.comment
    };

    Axios.post(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/commentpost`, postCommentData)
      .then((response) => {
        message.success(`Comment Added!`);
        that.setState({ comment: ' ', comments: response.data.comments });
      })
      .catch((error) => {
        console.log(error);
        message.error(`Something went wrong!`);
      });
  }

  commentLike(id, comment_id){
    const that = this;
    const postCommentData = {
      post_id: id,
      comment_id: comment_id,
      likeBy: this.props.userProfile._id,
    };
    Axios.post(`${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/likepost`, postCommentData)
      .then((response) => {
        that.setState({ comment: ' ', comments: response.data.comments });
      })
      .catch((error) => {
        console.log(error);
        message.error(`Something went wrong!`);
      });
  }

  fetchPosts() {
    const feedsEndoint = `${ConfigMain.getBackendURL()}/${this.props.userProfile._id}/feeds`;
    Axios.get(feedsEndoint)
      .then(response => 
        this.setState({ posts: response.data}))
      .catch(error => {});
  }

  viewMore() {
    this.setState({ showComments: true })
  }
  handleChange(e, name) {
    if(name === 'comment'){
      this.setState({ comment: e.target.value })
    }
  }

  render() {
    const { posts, comments } = this.state;
    const { userProfile } = this.props;
    const { _id, author, authorName, date, message } = this.props.data;
    return (
      <div className="col-box-wp">
        <div className="main-comment-box">
          <PostHeader author={author} authorName={authorName} date={date} userProfile={userProfile} />
          <p dangerouslySetInnerHTML={{ __html: nl2br(message) }} />
          { this.linkSnippet() }
          <PostFooter comments = {comments} postId = {_id} commentLike = {this.commentLike} commentPost = {this.commentPost} viewMore = {this.viewMore} state = {this.state} handleChange = {this.handleChange} />
        </div>
      </div>
    );
  }
}
