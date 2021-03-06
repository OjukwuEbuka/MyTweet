import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';


function Navbar(props) {

  const {user, isAuthenticated, logout} = props;

    return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-indigo mb-4">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Tweetme</a>
      <button className="navbar-toggler d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className=" d-flex" id="navbarSupportedContent">
        {/*
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-none">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form className="d-flex d-none">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        */}
        {
          isAuthenticated && (
            <ul className="navbar-nav mr-4 mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.username}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                  <li><a className="dropdown-item" href="/">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/">Something else here</a></li>
                </ul>
              </li>
            </ul>
          )
        }
      </div>
    </div>
  </nav>
    )
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.authReducer.isAuthenticated,
    user : state.authReducer.user,
  };
}

export default connect(mapStateToProps, {logout})(Navbar);