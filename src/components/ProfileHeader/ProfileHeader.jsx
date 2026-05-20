// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/auth/selectors';
// import { selectMyArticles } from '../../redux/articles/selectors.js';
// import s from './ProfileHeader.module.css';
// import UploadPhotoModal from '../UploadPhotoModal/UploadPhotoModal';

// const ProfileHeader = () => {
//   const user = useSelector(selectUser);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Отримуємо масив статей з Redux
//   const articles = useSelector(selectMyArticles);

// const BASE_URL = 'http://localhost:5000/';

//   // Якщо дані користувача ще вантажаться, показуємо заглушку або нічого
//   if (!user) {
//     return <div className={s.headerCard}>Loading user data...</div>;
//   }

//   // 2. РЕАЛЬНА КІЛЬКІСТЬ СТАТТЕЙ (як у консолі на image_5d004d.png)
//   const articlesCount = articles?.length || 0;

//   // Якщо аватара немає, ставимо заглушку
//   const avatarSrc = user?.avatarURL?.startsWith('http') 
//     ? user.avatarURL 
//     : `${BASE_URL}${user.avatarURL}`;

//   return (
//     <section className={s.headerCard}>
//       <div className={s.userInfo}>
//         <div className={s.avatarWrapper}>
//                 <div>
//       {/* Клікабельне коло аватара користувача */}
//       <div className="profile-avatar-zone" onClick={() => setIsModalOpen(true)}>
//          {/* Твій поточний аватар */}
//       </div>

//       {/* Рендеримо модалку, якщо стейт true */}
//       {isModalOpen && <UploadPhotoModal onClose={() => setIsModalOpen(false)} />}
//     </div>
//         <img
       
//           src={user?.avatarURL ? avatarSrc : 'default-avatar.png'} 
//   alt={user?.username ? `${user.username}'s avatar` : 'Default avatar'}
//           className={s.avatar}
//         />
//         </div>
        
//         <div className={s.textInfo}>
//           <h1 className={s.userName}>{user.username}</h1>
//           <p className={s.userEmail}>{user.email}</p>
  
//           <div className={s.stats}>
      
//             <div className={s.statItem}>
//               <span className={s.statValue}>{articlesCount}</span>
//               <span className={s.statLabel}>Articles</span>
//             </div>
//           </div>
//         </div>
//       </div>

//     </section>
//   );
// };

// export default ProfileHeader;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { selectMyArticles } from '../../redux/articles/selectors.js';
import s from './ProfileHeader.module.css';
import UploadPhotoModal from '../UploadPhotoModal/UploadPhotoModal';

const ProfileHeader = () => {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const articles = useSelector(selectMyArticles);

  const BASE_URL = 'http://localhost:5000/';

  if (!user) {
    return <div className={s.headerCard}>Loading user data...</div>;
  }

  const articlesCount = articles?.length || 0;

  const avatarSrc = user?.avatarURL?.startsWith('http') 
    ? user.avatarURL 
    : `${BASE_URL}${user.avatarURL}`;

  return (
    <section className={s.headerCard}>
      <div className={s.userInfo}>
        
        {/* 1. ПЕРЕНЕСЛИ onClick СЮДИ. Тепер клікається саме фото */}
        <div 
          className={s.avatarWrapper} 
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: 'pointer' }} // Додає вказівник пальця при наведенні
        >
          <img
            src={user?.avatarURL ? avatarSrc : 'default-avatar.png'} 
            alt={user?.username ? `${user.username}'s avatar` : 'Default avatar'}
            className={s.avatar}
          />
        </div>
        
        <div className={s.textInfo}>
          <h1 className={s.userName}>{user.username}</h1>
          <p className={s.userEmail}>{user.email}</p>
          
          <div className={s.stats}>
            <div className={s.statItem}>
              <span className={s.statValue}>{articlesCount}</span>
              <span className={s.statLabel}>Articles</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Рендеримо модалку в самому кінці секції, щоб вона не ламала розмітку */}
      {isModalOpen && <UploadPhotoModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default ProfileHeader;