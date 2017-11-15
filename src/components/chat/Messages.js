import React from 'react';

import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight - 300;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            username={message.username}
            message={message.message}
            time={message.time}
            fromMe={message.fromMe} />
        );
      });

    return (
      <div id='messageList' className="messageList">
        { messages }
      <br className="clear" />
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
