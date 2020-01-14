import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/new_interview">New Interview</Link></li>
          <li><Link to="/interviews">Interviews</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
