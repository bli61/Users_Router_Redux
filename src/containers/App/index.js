import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import UserList from '../../components/UserList';
import NewUser from '../../components/NewUser';
import EditUser from '../../components/EditUser';
import * as actions from '../../actions';
import './App.css';
import fakeUsers from '../../fake_users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: {
        firstName: '',
        lastName: '',
        title: '',
        sex: '',
        age: '',
        password: '',
        repeat: ''
      },
      //userWillCreate: false,
      curId: 0,
      curPageIndex: 0,
      input: '',
      passwordsSame: true,
      curEditId: null,
      pageOfUsers: [],
      redirect: false,
      edited: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { curId, newUser, users } = this.state;
    if (newUser.password === newUser.repeat) {
      const user = {
        id: curId,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        title: newUser.title,
        sex: newUser.sex,
        age: newUser.age
      };
      const newUsers = [...users, user];
      this.setState({
        curId: curId + 1,
        users: newUsers,
        newUser: {
          firstName: '',
          lastName: '',
          title: '',
          sex: '',
          age: '',
          password: '',
          repeat: ''
        },
        passwordsSame: true,
        redirect: true
      });
    } else {
      this.setState({
        newUser: {
          ...this.state.newUser,
          password: '',
          repeat: '',
        },
        passwordsSame: false
      })
    }
  };

  handleEditSubmit = (e, id) => {
    e.preventDefault();
    const { users, editUser } = this.state;
    if (editUser.password === editUser.repeat) {
      let index = -1;
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          index = i;
          break;
        }
      }
      const newUsers = [...users.slice(0, index), editUser, ...users.slice(index + 1)];
      this.setState({
        users: newUsers,
        redirect: true,
        edited: true
      });
    } else {
      this.setState({
        editUser: {
          ...this.state.editUser,
          password: '',
          repeat: ''
        },
        passwordsSame: false
      });
    }
  };

  handleSort = (e, key) => {
    e.preventDefault();
    const pageOfUsers = this.state.pageOfUsers;
    pageOfUsers.sort((user1, user2) => {
      const val1 = user1[key];
      const val2 = user2[key];
      if (val1 === val2) {
        return 0;
      }
      return val1 < val2 ? -1 : 1;
    });
    this.setState({ pageOfUsers });
  };

  handleDelete = id => {
    let users = this.state.users;
    let index = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        index = i;
        break;
      }
    }
    const newUsers = [...users.slice(0, index), ...users.slice(index + 1)];
    this.setState({ users: newUsers });
  };

  onChangePage = pageOfUsers => {
    this.setState({ pageOfUsers });
  };

  getEditUser = id => {
    console.log('get edit user is called')
    const users = this.props.users;
    for (let user of users) {
      if (user.id === id) {
        return user;
      }
    }
  };

  addUser = user => {
    this.props.dispatch(actions.addUser(user));
  };

  redirectToHome = () => {
    this.props.dispatch(actions.redirect());
  };

  cancelRedirect = () => {
    this.props.dispatch(actions.cancelRedirect());
  };

  editUser = (id, user) => {
    this.props.dispatch(actions.editUser(id, user));
  };

  componentDidMount() {
    for (let user of fakeUsers) {
      this.addUser(user);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.users !== prevProps.users) {
      this.cancelRedirect();
    }
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() =>
              <UserList
                users={this.props.users}
                onSearchChange={this.changeSearchInput}
                handleSort={this.handleSort}
                handleEdit={this.handleEdit}
                deleteUser={this.deleteUser}
                handleClick={this.handleClick}
                onChangePage={this.onChangePage}
                pageOfUsers={this.state.pageOfUsers}
              />
            }
          />
          <Route path="/new_user" render={() =>
            <NewUser
              addUser={this.addUser}
              redirect={this.props.redirect}
              redirectToHome={this.redirectToHome}
            />}
          />
          <Route path="/edit/:userId" render={({ match }) => {

            return (
              <EditUser
                id={match.params.userId}
                editUser={this.editUser}
                getEditUser={this.getEditUser}
                redirectToHome={this.redirectToHome}
                redirect={this.props.redirect}
              />
            );
          }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    redirect: state.redirect,
  };
};

export default connect(mapStateToProps)(App);
