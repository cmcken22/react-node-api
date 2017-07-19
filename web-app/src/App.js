import React from 'react';
// import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      activeUser: {},
    }
  }

  componentDidMount(){
    console.log('componentDidMount');
    const _this = this;
    $.get("/api/users", function(users, status){
      _this.setState({users: users});
    });
  }

  setActiveUser = (user) => {
    console.log('setActiveUser', user);
    console.log('--->', user.username);
    this.setState({activeUser: user});
  }

  render() {
    const userList = this.state.users.map((user, i) =>
      <li key={i}>{user.username} --> {user.password}</li>
    );
    return (
      <div>
        <h1>Hello {this.state.activeUser.username}</h1>
        <InputField
          setActiveUser={this.setActiveUser}
        />
        <ul>{userList}</ul>
      </div>
    );
  }
}

class InputField extends React.Component {
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
    $.post("/api/users", user, function(data, status){
      console.log("Data: ", data);
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

export default App;
