import React from 'react';
import $ from 'jquery';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Col, Well } from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      username: '',
      email: '',
      password: '',
    }
  }

  handleLogin = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    const _this = this;
    $.post("/api/login", user, function(res, status){
      console.log('res', res);
      if(res.user){
        _this.props.setActiveUser(res.user);
      }
    });
    this.clearFields();
  }

  clearFields = () => {
    this.setState({
      username: '',
      password: ''
    });
  }

  handleCreateUser = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    $.post("/api/users", user, function(res, status){
      console.log("res: ", res);
    });
    this.clearFields();
  }

  clearFields = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
    });
  }

  onUsernameChange = (evt) => {
    this.setState({ username: evt.target.value });
  }
  onEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }
  onPasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  toggleForm = () => {
    this.setState({login: !this.state.login});
  }

  render() {
    const loginForm = (
      <Col md={4}>
        <FormControl
          type="text"
          placeholder='username'
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
        <FormControl
          type="text"
          placeholder='password'
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <Button onClick={this.handleLogin}>Login</Button>
      </Col>
    );
    const registerForm = (
      <Col md={4}>
        <FormControl
          type="text"
          placeholder='username'
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
        <FormControl
          type="text"
          placeholder='email'
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <FormControl
          type="text"
          placeholder='password'
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <Button onClick={this.handleCreateUser}>Register</Button>
      </Col>
    );
    return (
      <div>
        {this.state.login ? loginForm : registerForm}
        <Button onClick={this.toggleForm}>{this.state.login ? 'click to register' : 'back to login'}</Button>
      </div>
    );
  }
}

export default LoginForm;
