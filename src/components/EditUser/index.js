import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state={
      editUser: {
        firstName: '',
        lastName: '',
        title: '',
        sex: '',
        age: '',
        password: '',
      },
      repeat: '',
      passwordsSame: true
    };
  }

  componentDidMount() {
    let { getEditUser, id } = this.props;
    id = parseInt(id);
    const curEditUser = getEditUser(id);
    this.setState({editUser: curEditUser});
  }

  onChange = (e, key) => {
    const editUser = {};
    editUser[key] = e.target.value;
    this.setState({
      editUser: {
        ...this.state.editUser,
        ...editUser
      }
    });
  };

  onRepeatChange = e => {
    this.setState({repeat: e.target.value});
  };

  handleSubmit = e => {
    let {id, editUser, redirectToHome} = this.props;
    id = parseInt(id);
    if (this.state.editUser.password === this.state.repeat) {
      editUser(id, this.state.editUser);
      this.setState({
        editUser: {
          firstName: '',
          lastName: '',
          title: '',
          sex: '',
          age: '',
          password: ''
        },
        repeat: '',
        passwordsSame: true
      });
      redirectToHome();
    } else {
      this.setState({
        editUser: {
          ...this.state.editUser,
          password: '',
        },
        repeat: '',
        passwordsSame: false
      });
    }
  };

  render() {
    let { redirect } = this.props;
    if (redirect) {
      return <Redirect to={{pathname: '/'}} />;
    }
    return (
      <div className="new_user">
        <h3>Edit User:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row" >
            <label className="col-sm-2 col-lg-2 col-form-label" htmlFor="first_name">
              First Name:
          </label>
            <div className="col-sm-10 col-lg-4">
              <input
                type="text"
                id="first_name"
                value={this.state.editUser.firstName}
                className="form-control"
                onChange={e => this.onChange(e, 'firstName')}
                required={true}
              />
            </div>

          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-lg-2 col-form-label" htmlFor="last_name">
              Last Name:
          </label>
            <div className="col-sm-10 col-lg-4">
              <input
                type="text"
                id="last_name"
                value={this.state.editUser.lastName}
                className="form-control"
                onChange={e => this.onChange(e, 'lastName')}
                required={true}
              />
            </div>

          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-lg-2 col-form-label" htmlFor="title">
              Title:
          </label>
            <div className="col-sm-10 col-lg-4">
              <input
                type="text"
                id="title"
                value={this.state.editUser.title}
                className="form-control"
                onChange={e => this.onChange(e, 'title')}
              />
            </div>

          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-lg-2 col-form-label" htmlFor="sex">
              Sex:
          </label>
            <div className="col-sm-10 col-lg-4">
              <select onChange={e => this.onChange(e, 'sex')}>
                <option value="">---</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>

          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-lg-2 col-form-label" htmlFor="age">
              Age:
          </label>
            <div className="col-sm-10 col-lg-4">
              <input
                type="number"
                id="age"
                value={this.state.editUser.age}
                className="form-control"
                onChange={e => this.onChange(e, 'age')}
              />
            </div>

          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="password">
              Password:
          </label>
            <div className="col-sm-10 col-lg-4">
              <input
                type="password"
                id="password"
                value={this.state.editUser.password}
                className="form-control"
                onChange={e => this.onChange(e, 'password')}
                required={true}
              />
            </div>

          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="password_repeat">
              Repeat:
          </label>
            <div className="col-sm-10 col-lg-4">
              <input
                type="password"
                id="password_repeat"
                value={this.state.repeat}
                className="form-control"
                onChange={this.onRepeatChange}
                required={true}
              />
            </div>

          </div>
          <button className="btn btn-secondary" type="submit">Save Changes</button>
        </form>
        <div>{this.state.passwordsSame ? '' : 'Passwords are not the same'}</div>
      </div>
    );
  }
}

export default EditUser;