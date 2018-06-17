import React, { Component } from 'react';
import Axios from 'axios';
import ConfigMain from '~/configs/main';
import { connect, mapStateToProps } from 'react-redux';
import { signUp, closeSignUpForm } from '../redux/actions/authorization';

/*
  It's just simple mock form to test out local password authorization
  Probably to be replaced.
 */
class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      message: null,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    Axios.post(`${ConfigMain.getBackendURL()}/auth/sign-in`, {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    })
      .then(response => {
        this.props.closeSignUpForm();
        this.props.signUp(response.data);
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.setState({ message: 'Email address already registred. Password incorrect.' });
        } else {
          this.setState({ message: 'Unknown server error occurs' });
        }
      });
  }

  singIn() {}
  render() {
    return (
      <form
        style={styles.form}
        onChange={event => this.handleChange(event)}
        onSubmit={event => this.handleSubmit(event)}
      >
        <input
          className="form-control"
          style={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          required
          value={this.state.email}
        />
        <input
          className="form-control"
          style={styles.input}
          name="name"
          type="text"
          placeholder="Name"
          required
          value={this.state.name}
        />
        <input
          className="form-control"
          style={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={this.state.password}
        />
        {this.state.message && <div>{this.state.message}</div>}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Signup
        </button>
      </form>
    );
  }
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  input: {
    margin: '10px 0',
  },
  button: {
    backgroundColor: 'blue',
  },
};

export default connect(
  null,
  { signUp, closeSignUpForm },
)(Registration);
