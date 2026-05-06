import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMyArticles } from '../../redux/articles/operations.js';
import { selectMyArticles } from '../../redux/articles/selectors.js';
import { selectUser } from '../../redux/auth/selectors';
import css from './ProfilePage.module.css';

const BASE_URL = 'http://localhost:5000/';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const myArticles = useSelector(selectMyArticles) || []; // Беремо реальні статті

  useEffect(() => {
    dispatch(fetchMyArticles()); // Завантажуємо при заході на сторінку
  }, [dispatch]);

  const avatarSrc = user?.avatarURL?.startsWith('http') 
    ? user.avatarURL 
    : `${BASE_URL}${user?.avatarURL}`;

  
console.log("Дані у ProfilePage:", myArticles); // Що тут пише в консолі браузера?
 console.log("ID поточної Debby:", user?._id);
console.log("Власник першої статті:", myArticles.length > 0 ? myArticles[0].owner?.username : "ще немає даних");
 
return (
    <div className={css.container}>
      <h1 className={css.title}>My Profile</h1>
      
      <div className={css.profileHeader}>
        <div className={css.mainInfo}>
          <div className={css.avatarWrapper}>
            <img src={user?.avatarURL ? avatarSrc : '/default-avatar.png'} alt="Avatar" className={css.largeAvatar} />
            <button className={css.editIconBtn}>✎</button>
          </div>
          
          <div className={css.userText}>
            <h2 className={css.userName}>{user?.username || 'Debby'}</h2>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.editBtn}>Edit Profile</button>
          </div>
        </div>

        {/* Статистика як у Figma */}
        <div className={css.statsBar}>
          <div className={css.statItem}>
            <span className={css.statNumber}>{myArticles.length}</span>
            <span className={css.statLabel}>Articles</span>
          </div>
          <div className={css.statItem}>
            <span className={css.statNumber}>0</span>
            <span className={css.statLabel}>Followers</span>
          </div>
          <div className={css.statItem}>
            <span className={css.statNumber}>0</span>
            <span className={css.statLabel}>Following</span>
          </div>
        </div>
      </div>

      {/* Секція зі статтями */}
      <div className={css.articlesSection}>
        <h3 className={css.sectionTitle}>My Articles</h3>
        <div className={css.articlesGrid}>
          {Array.isArray(myArticles) && myArticles.length > 0 ? (
            myArticles.map(({ _id, title, category, createdAt }) => (
              <div key={_id} className={css.articleCard}>
                 {/* Тут твоя картка статті */}
                 <h4>{title}</h4>
                  <p>{category}</p>
                 <p>{new Date(createdAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>You haven't written any articles yet.</p>
          )}
    
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;