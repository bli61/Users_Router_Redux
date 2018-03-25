import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import UserList from '../../components/UserList';
import NewUser from '../../components/NewUser';
import EditUser from '../../components/EditUser';
import * as actions from '../../actions';
import './App.css';

// save state for cur page, sorting order etc.
// validation
// login for pagination in reducer

class App extends Component {
  
  getEditUser = _id => {
    console.log('get edit user is called');
    console.log('id: ', _id)
    const users = this.props.pageOfUsers;
    for (let user of users) {
      if (user._id === _id) {
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
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.equal(this.props.pageOfUsers, prevProps.pageOfUsers)) {
      this.cancelRedirect();
      //this.props.dispatch(actions.fetchPage(this.props.status.curPage, 5));
    }
  }

  equal = (arr1, arr2) => {
    if (arr1 === null && arr2 === null) {
      return true;
    }
    if (arr1 === null || arr2 === null) {
      return false;
    }
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]._id !== arr2[i]._id) {
        return false;
      }
    }
    return true;
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
                _id={match.params.userId}
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
    pageOfUsers: state.page.pageOfUsers,
    redirect: state.redirect,
    status: state.status
  };
};

export default connect(mapStateToProps)(App);
