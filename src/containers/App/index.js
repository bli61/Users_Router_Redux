import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import UserList from '../../components/UserList';
import NewUser from '../../components/NewUser';
import EditUser from '../../components/EditUser';
import * as actions from '../../actions';
import './App.css';
import fakeUsers from '../../fake_users';

// save state for cur page, sorting order etc.
// validation
// login for pagination in reducer

class App extends Component {
  
  getEditUser = id => {
    console.log('get edit user is called');
    console.log('id: ', id)
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
                //handleSort={this.handleSort}
                deleteUser={this.deleteUser}
                handleClick={this.handleClick}
                onChangePage={this.onChangePage}
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
