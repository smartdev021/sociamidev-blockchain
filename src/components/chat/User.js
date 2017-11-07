import React from 'react';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedItem: '-2'};
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(event) {
    event.preventDefault();
    this.state.selectedItem = event.currentTarget.dataset.id;
    this.props.onTab(event.currentTarget.id,event.currentTarget.dataset.user,event.currentTarget.dataset.id);
  }

  render() {
    const tabClass = String(this.state.selectedItem) === String(this.props.selectedTab) ? "personSelected" : "person";
    const classes = `${tabClass}` ;
    var fullname = this.props.firstName + " " + this.props.lastName;
    return (
          <div data-id={`${this.props.tabKey}`} className={classes} onClick={this.onItemClick}  id={`${this.props.username}`} data-user={`${fullname}`}>
            <img src="https://s13.postimg.org/ih41k9tqr/img1.jpg" alt="" />
            <span className="name">{ fullname }</span>
            <span className="time">2:09 PM</span>
            <span className="preview">I was wondering...</span>
          </div>
    );
  }
}

User.defaultProps = {
  tabKey:'',
  username: ''
};

export default User;
