// import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Simple User Login'
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <InputField/>
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
    $.get("/api/users", function(users, status){
        console.log("Users: ", users);
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

ReactDOM.render(<App />, document.getElementById('root'));
