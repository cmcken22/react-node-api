import React from 'react';
import './App.css';
import $ from 'jquery';
import LoginForm from './components/loginForm';

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
        <LoginForm
          setActiveUser={this.setActiveUser}
        />
        <ul>{userList}</ul>
      </div>
    );
  }
}

export default App;
