import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.css'

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      title: '',
      sex: '',
      age: '',
      password: '',
      repeat: '',
      passwordsSame: true
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.repeat) {
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        title: this.state.title,
        sex: this.state.sex,
        age: this.state.age,
        password: this.state.password
      };
      this.props.addUser(user);
      this.props.redirectToHome();
      this.setState({
        firstName: '',
        lastName: '',
        title: '',
        sex: '',
        age: '',
        passwordsSame: true
      });
    } else {
      this.setState({
        password: '',
        repeat: '',
        passwordsSame: false
      });
    }
  };

  onFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };

  onLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  onSexChange = e => {
    this.setState({ sex: e.target.value });
  };

  onAgeChange = e => {
    const age = parseInt(e.target.value);
    this.setState({ age });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onRepeatChange = e => {
    this.setState({ repeat: e.target.value });
  }

  render() {
    const { redirect } = this.props;
    if (redirect) {
      return <Redirect to={{ pathname: '/' }} />
    } else {
      return (
        <div className="new_user">
          <h3>Create New User:</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row" >
              <label className="col-sm-2 col-lg-2 col-form-label" htmlFor="first_name">
                First Name:
              </label>
              <div className="col-sm-10 col-lg-4">
                <input
                  type="text"
                  id="first_name"
                  value={this.state.firstName}
                  className="form-control"
                  onChange={this.onFirstNameChange}
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
                  value={this.state.lastName}
                  className="form-control"
                  onChange={this.onLastNameChange}
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
                  value={this.state.title}
                  className="form-control"
                  onChange={this.onTitleChange}
                />
              </div>

            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-lg-2 col-form-label" htmlFor="sex">
                Sex:
          </label>
              <div className="col-sm-10 col-lg-4">
                <select onChange={this.onSexChange}>
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
                  value={this.state.age}
                  className="form-control"
                  onChange={this.onAgeChange}
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
                  value={this.state.password}
                  className="form-control"
                  onChange={this.onPasswordChange}
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
          <div>
            {this.state.passwordsSame ? ('') : ('Passwords are not the same!')}
          </div>

        </div>
      );
    }
  }
}

export default NewUser;