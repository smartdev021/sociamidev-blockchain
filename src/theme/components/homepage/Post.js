import React from 'react';
import Moment from 'moment';

export default (props) => {

  return (
    <div className="black-box">
      <div className="main-comment-box">
        <div className="top-head">
          <div className="profile-icon">
            <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-9.png" alt="" />
          </div>
          <span className="col-heading">{props.data.authorName}</span>
          <span className="date">{Moment(props.data.date).format('DD.MM.YYYY')}</span>
        </div>
        <p>{props.data.message}</p>
        {/* <div className="img-box">
        <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/center-middle-img.png" alt="" />
        </div>
        <h4>Winning the Game of Innovation Advantages and Disadvantages</h4>
        <p>Innovation is widely known as a value which is worth pursuing or even a corporate cure-all. However it is important to be aware of the many innovation...</p> */}
        <div className="bot-wp">
          <div className="likewp">
            <div className="thum-like">
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </div>
            <span>Anna +23 others</span>
            <span className="comments-txt">4 comments</span>
          </div>
          <div className="input-wp">
            <div className="input-filed">
              <input type="text" name="" placeholder="Write comment..." />
              <a href="#" className="camera-icon"><i className="fa fa-camera"></i></a>
            </div>
            <div className="bot-share-btns">
              <ul>
                <li><a href="#"><div className="icon-white text-blue"><i className="fa fa-share"></i></div></a></li>
                <li><a href="#"><div className="icon-white icon-blue"><i className="fa fa-thumbs-up"></i></div></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
