import React from 'react';
import TimeAgo from 'react-timeago';

class Message extends React.Component {

  getTimeStamp(date){
    var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var d = new Date(date);
    var monthText = monthNames[d.getMonth()];
    var dateText = d.getDate();

    var hourText = d.getHours();
    var minuteText = d.getMinutes();
    var ampmText = hourText >= 12 ? 'PM' : 'AM';
    hourText = hourText % 12;
    hourText = hourText ? hourText : 12;

    return dateText + " " + monthText + "  " + hourText + ":" + minuteText + " " + ampmText;
  }

  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'me' : 'you';
    const timeStampClass = this.props.fromMe ? 'timeStampMe' : 'timeStampYou';
    var timeStamp = this.getTimeStamp(this.props.time);
    return (
      <div>
      <div className={`bubble ${fromMe}`}>
        { this.props.message}
      </div>
      <div className={`${timeStampClass}`}>
      <TimeAgo date={this.props.time} />
      </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: '',
  fromMe: false
};

export default Message;
