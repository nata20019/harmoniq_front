import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import css from './AuthNav.module.css';

const AuthNav = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={css.authNav}>
        <nav
                className={`${css.navigation} ${isMenuOpen ? css.isOpen : ''}`}
              >
                <NavLink
                  to="/"
                  className={css.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/articles"
                  className={css.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Articles
                </NavLink>
                <NavLink
                  to="/creators"
                  className={css.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Creators
                </NavLink>
                <NavLink
                  to="/login"
                  className={css.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  className={css.navJoinBtn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join now
                </NavLink>
              </nav>

              <div className={css.rightSide}>
                <NavLink to="/register" className={css.tabletJoinBtn}>
                  Join now
                </NavLink>
                <button
                  className={css.burgerBtn}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg width="32" height="32">
                    <path
                      d="M4 8h24M4 16h24M4 24h24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
    </div>
  );
};

export default AuthNav;
