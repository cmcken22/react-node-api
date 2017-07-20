import React from 'react';
import $ from 'jquery';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
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

  onUsernameChange = (evt) => {
    this.setState({ username: evt.target.value });
  }

  onPasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }

  render() {
    return (
      <div>
        <input
          placeholder='username'
          value={this.state.username}
          onChange={this.onUsernameChange}
        /><br/>
        <input
          placeholder='password'
          value={this.state.password}
          onChange={this.onPasswordChange}
        /><br/>
        <button onClick={this.handleCreateUser}>Create User</button>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default LoginForm;
