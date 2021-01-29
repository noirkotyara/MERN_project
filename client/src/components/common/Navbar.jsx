import { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import styles from './Navbar.module.scss'

export const Navbar = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    const onLogout = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (<nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">LinksShorts</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Create new</NavLink></li>
            <li><NavLink to="/links">Links</NavLink></li>
            <li><NavLink to="/" onClick={onLogout}>LogOut</NavLink></li>
          </ul>
        </div>
      </nav>)
}