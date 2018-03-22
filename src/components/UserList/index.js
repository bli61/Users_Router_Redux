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
    this.state = {
      displyedUsers: []
    };
  }

  componentDidMount() {
    const users = this.props.pageOfUsers;
    this.setState({pageOfUsers: users});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.displyedUsers !== this.props.pageOfUsers) {
      this.setState({displyedUsers: this.props.pageOfUsers});
    }
  }

  deleteUser = id => {
    this.props.dispatch(actions.deleteUser(id));
  };

  changeSearchInput = input => {
    this.props.dispatch(actions.changeSearchInput(input));
  };

  handleSort = (e, key) => {
    e.preventDefault();
    const users = this.state.displyedUsers;
    users.sort((user1, user2) => {
      if (user1[key] === user2[key]) {
        return 0;
      }
      return user1[key] < user2[key] ? -1 : 1;
    });
    this.setState({displyedUsers: users});
  };

  setPageOfUsers = pageOfUsers => {
    this.props.dispatch(actions.setPageOfUsers(pageOfUsers))
  };

  render() {
    let filteredUsers = this.state.displyedUsers;
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
          items={this.props.users}
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
    pageOfUsers: state.pageOfUsers
  };
}

export default connect(mapStateToProps)(UserList);