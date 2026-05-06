import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations.js';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors.js';
import css from './UserMenu.module.css';
import { NavLink } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser) || {};
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn && !user.email && !user.username) return null;

  const avatarSrc = user?.avatarURL?.startsWith('http') 
    ? user.avatarURL 
    : `${BASE_URL}${user.avatarURL}`;

  return (
    <div className={css.userWrapper}>
      <nav className={css.nav}>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/articles">Articles</NavLink>
        <NavLink to="/creators">Creators</NavLink>
        <NavLink to="/profile">My Profile</NavLink>
      </nav>

      <button className={css.createBtn}>Create an article</button>

      <div className={css.profileInfo}>
        <img
       
          src={user?.avatarURL ? avatarSrc : 'default-avatar.png'} 
  alt={user?.username ? `${user.username}'s avatar` : 'Default avatar'}
          className={css.avatar}
        />
        <span className={css.username}>{user?.username || 'User'}</span>
      </div>

      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => dispatch(logout())}
        
        title="Logout"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  );
};
