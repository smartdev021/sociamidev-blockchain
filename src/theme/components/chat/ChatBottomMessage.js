import React from 'react';

class ChatBottomMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: '' };
  }

  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    // Clear the input box
    let copy = Object.assign({}, this.state, { chatInput: '' });
    this.setState(copy);

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
  }

  textChangeHandler(event) {
    let copy = Object.assign({}, this.state, { chatInput: event.target.value });
    this.setState(copy);
  }

  render() {
    return (
      <form className="right-footer" onSubmit={event => this.submitHandler(event)}>
        <div className="input-holder">
          <input
            type="text"
            onChange={event => this.textChangeHandler(event)}
            value={this.state.chatInput}
            className="chat-input"
            required
          placeholder="Type a message"/>
        </div>
        <div className="chat-icons">
          <ul>
            <li>
              <a className="fa fa-link"></a>
            </li>
            <li>
              <a className="fa fa-picture-o"></a>
            </li>
            <li>
              <a className="fa fa-paperclip"></a>
            </li>
            <li>
              <a className="fa fa-smile-o"></a>
            </li>
            <button type="submit" className="send-btn">
              <a className="fa fa-play"></a>
            </button>
          </ul>
        </div>
      </form>
    );
  }
}

ChatBottomMessage.defaultProps = {};

export default ChatBottomMessage;
