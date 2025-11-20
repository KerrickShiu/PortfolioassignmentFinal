import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export default function Layout() {
  return (
    <>
      <h1>My Portfolio</h1>
      <img src={logo} alt="Logo" style={{ width: '125px', height: '125px' }} />
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/education">Education</Link> |{' '}
        <Link to="/project">Project</Link> | <Link to="/services">Services</Link> | <Link to="/contact">Contact</Link> |{' '}
        <Link to="/counter">Rate My Website</Link> | <Link to="/signup">Sign Up</Link> | <Link to="/signin">Sign In</Link>
      </nav>
      <br />
      <hr />
    </>
  );
}