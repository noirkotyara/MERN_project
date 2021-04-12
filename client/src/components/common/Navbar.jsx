import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import * as Icons from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {

  const auth = useContext(AuthContext)
  const history = useHistory()

  const onLogout = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  return (<>
    <nav className="nav-extended">
      <div className="nav-wrapper #80cbc4 teal lighten-3">
        <a href="/" className="brand-logo" style={{ paddingLeft: "15px" }}>Links Cutter</a>
        <a href="#" dataactivates="mobile-demo" className="sidenav-trigger"><FontAwesomeIcon icon={Icons.faEllipsisV} /></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create new</NavLink></li>
          <li><NavLink to="/links">Links</NavLink></li>
          <li><NavLink to="/" onClick={onLogout}>LogOut</NavLink></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id="mobile-demo">
      <li><NavLink to="/create">Create new</NavLink></li>
      <li><NavLink to="/links">Links</NavLink></li>
      <li><NavLink to="/" onClick={onLogout}>LogOut</NavLink></li>
    </ul>


  </>)
}