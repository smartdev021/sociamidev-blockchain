import React,{Component} from 'react';

class ChatHeader extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      active: 'general'
    };
  }

  handleSelect(event, name) {
    this.setState({ active: name });
  }

  render(){
    const { active } = this.state;
    return(
      <div className="chat-header">
        <div className="chat-header-menu">
          <ul className="tab-wp">
            <li onClick={(e)=>this.handleSelect(e, 'general')} className={active === 'general' ? 'active' : ''}>
              <a>General</a>
            </li>
            <li onClick={(e)=>this.handleSelect(e, 'friends')} className={active === 'friends' ? 'active' : ''}>
              <a>Friends</a>
            </li>
            <li onClick={(e)=>this.handleSelect(e, 'spaces')} className={active === 'spaces' ? 'active' : ''}>
              <a>Spaces</a>
            </li>
          </ul>
        </div>
        <div className="chat-header-action">
          <ul>
            <li onClick={()=>this.props.toggleChatHolder()}>
              <a className="fa fa-times"></a>
            </li>
            <li>
              <a className="fa fa-angle-double-down"></a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default ChatHeader;
