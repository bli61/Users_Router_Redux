import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar';
import UserTable from '../UserTable';
import Pagination from '../../containers/Pagination';
import * as actions from '../../actions';
import './style.css';

class UserList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchPage(1, 5));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pageOfUsers.length !== prevProps.pageOfUsers.length) {
      this.props.dispatch(actions.fetchPage(this.props.curPage, 5));
    }
  }

  deleteUser = _id => {
    this.props.dispatch(actions.deleteUser(_id));
  };

  changeSearchInput = input => {
    this.props.dispatch(actions.changeSearchInput(input));
  };

  handleSort = (e, key) => {
    e.preventDefault();
    this.props.dispatch(actions.sortUsers(key));
  };

  render() {
    let filteredUsers = this.props.pageOfUsers;
    console.log('filtered users: ', filteredUsers);
    const searchInput = this.props.searchInput;
    console.log(searchInput)
    if (searchInput !== '') {
      filteredUsers = filteredUsers.filter(user => {
        for (let key in user) {
          if (typeof user[key] === 'string' && key !== 'password') {
            const item = user[key].toLowerCase();
            const input = searchInput.toLowerCase();
            if (item.indexOf(input) === 0) {
              return true;
            }
          }
        }
        return false;
      });
    }

    return (
      <div className="user_list">
        <h1>Users</h1>
        <SearchBar
          searchInput={searchInput}
          onSearchChange={this.changeSearchInput}
        />
        <UserTable
          users={filteredUsers}
          handleSort={this.handleSort}
          deleteUser={this.deleteUser}
        />
        <Pagination
          setPageOfUsers={this.setPageOfUsers}
        />
        <Link to="/new_user" className="btn btn-primary" onClick={this.handleClick}>
          Create New User
        </Link>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput,
    totalItems: state.page.totalItems,
    pageOfUsers: state.page.pageOfUsers,
    curPage: state.page.curPage
  };
}

export default connect(mapStateToProps)(UserList);