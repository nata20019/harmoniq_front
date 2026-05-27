// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../redux/auth/operations.js';
// import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors.js';
// import css from './UserMenu.module.css';
// import { NavLink } from 'react-router-dom';

// const BASE_URL = 'https://harmoniq-back.onrender.com/';

// export const UserMenu = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser) || {};
//   const isLoggedIn = useSelector(selectIsLoggedIn);
  
//   if (!isLoggedIn && !user.email && !user.username) return null;

//   const avatarSrc = user?.avatarURL?.startsWith('http') 
//     ? user.avatarURL 
//     : `${BASE_URL}${user.avatarURL}`;

//   return (
//     <div className={css.userWrapper}>
//       <nav className={css.nav}>
//         <NavLink to="/home">Home</NavLink>
//         <NavLink to="/articles">Articles</NavLink>
//         <NavLink to="/creators">Creators</NavLink>
//         <NavLink to="/profile">My Profile</NavLink>
     
//       <NavLink to="/create-article" className={css.createBtn}>
//   Create an article
// </NavLink>
//  </nav>
//       <div className={css.profileInfo}>
//         <img
       
//           src={user?.avatarURL ? avatarSrc : 'default-avatar.png'} 
//   alt={user?.username ? `${user.username}'s avatar` : 'Default avatar'}
//           className={css.avatar}
//         />
//         <span className={css.username}>{user?.username || 'User'}</span>
//       </div>

//       <button
//         type="button"
//         className={css.logoutBtn}
//         onClick={() => dispatch(logout())}
        
//         title="Logout"
//       >
//         <svg
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//           <polyline points="16 17 21 12 16 7" />
//           <line x1="21" y1="12" x2="9" y2="12" />
//         </svg>
//       </button>
//     </div>
//   );
// };
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations.js';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors.js';
import css from './UserMenu.module.css';
import { NavLink } from 'react-router-dom';

const BASE_URL = 'https://harmoniq-back.onrender.com/';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser) || {};
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  // Стан для мобільного меню (відкрите/закрите)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isLoggedIn && !user.email && !user.username) return null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const avatarSrc = user?.avatarURL?.startsWith('http') 
    ? user.avatarURL 
    : `${BASE_URL}${user.avatarURL}`;

  return (
    <div className={css.userMenuContainer}>
      {/* Кнопка бургера — видно ТІЛЬКИ на мобільному */}
      <button
        type="button"
        className={`${css.burgerBtn} ${isMenuOpen ? css.burgerBtnOpen : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className={css.burgerLine}></span>
        <span className={css.burgerLine}></span>
        <span className={css.burgerLine}></span>
      </button>

      {/* Головна обгортка, яка на мобільному стає випадаючим списком */}
      <div className={`${css.userWrapper} ${isMenuOpen ? css.isOpen : ''}`}>
        <nav className={css.nav}>
          <NavLink to="/home" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/articles" onClick={closeMenu}>Articles</NavLink>
          <NavLink to="/creators" onClick={closeMenu}>Creators</NavLink>
          <NavLink to="/profile" onClick={closeMenu}>My Profile</NavLink>
          
          <NavLink to="/create-article" className={css.createBtn} onClick={closeMenu}>
            Create an article
          </NavLink>
        </nav>

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
          onClick={() => {
            closeMenu();
            dispatch(logout());
          }}
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
    </div>
  );
};