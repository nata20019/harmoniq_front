import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import css from './Header.module.css';
import Container from '../Container/Container';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContent}>
          <Link to="/" className={css.logo}>
            harmoniq
          </Link>

          <div className={css.rightSide}>
            {/* Кнопка ТІЛЬКИ для планшета */}
            <NavLink to="/register" className={css.tabletJoinBtn}>
              Join now
            </NavLink>

            <button
              className={css.burgerBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M4 8h24M4 16h24M4 24h24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className={`${css.navigation} ${isMenuOpen ? css.isOpen : ''}`}>
            <NavLink to="/" className={css.link}>
              Home
            </NavLink>
            <NavLink to="/articles" className={css.link}>
              Articles
            </NavLink>
            <NavLink to="/create-article" className={css.link}>
              Creators
            </NavLink>
            <NavLink to="/login" className={css.link}>
              Log in
            </NavLink>

            {/* Кнопка всередині меню (для моб та десктопа) */}
            <NavLink to="/register" className={css.navJoinBtn}>
              Join now
            </NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
