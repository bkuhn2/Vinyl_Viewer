import { Link } from "react-router-dom"
import "./_Header.scss"

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title" data-cy="nav-home">VINYL VIEWER</h1>
      </Link>
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <Link to="/search" data-cy="nav-search">
              <button 
                className="nav-button"
              >EXPLORE</button>
            </Link>
          </li>
          <li>
            <Link to="/my-collection" data-cy="nav-my-collection">
              <button 
                className="nav-button"
              >MY COLLECTION</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;