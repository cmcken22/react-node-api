import React from 'react';
import './App.css';
import $ from 'jquery';
import LoginForm from './components/loginForm';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Well } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
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

  toggleLogin = () => {
    this.setState({login: !this.state.login});
  }

  render() {
    const userList = this.state.users.map((user, i) =>
      <li key={i}>{user.username} --> {user.password}</li>
    );
    const navbarInstance = (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
    return (
      <div className="content">
        {navbarInstance}
        <Well bsSize="small" className="custom">
          <div className="loginPanel">
            <LoginForm
              setActiveUser={this.setActiveUser}
            />
          </div>
        </Well>
      </div>
    );
  }
}

export default App;
