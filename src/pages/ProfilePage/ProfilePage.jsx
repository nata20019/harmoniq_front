import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMyArticles } from '../../redux/articles/operations.js';
import { selectMyArticles } from '../../redux/articles/selectors.js';
// import { selectUser } from '../../redux/auth/selectors';
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx';
import css from './ProfilePage.module.css';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader.jsx';
import Container from '../../components/Container/Container.jsx';
import { NavLink } from 'react-router-dom';


const ProfilePage = () => {
  const dispatch = useDispatch();
  const myArticles = useSelector(selectMyArticles) || []; // Беремо реальні статті

  useEffect(() => {
    dispatch(fetchMyArticles()); // Завантажуємо при заході на сторінку
  }, [dispatch]);


  
console.log("Дані у ProfilePage:", myArticles); // Що тут пише в консолі браузера?
// console.log("Власник першої статті:", myArticles.length > 0 ? myArticles[0].owner?.username : "ще немає даних");
 
return (
  <Container>
    <div className={css.container}>
     <ProfileHeader /> {/* Використовуємо готовий компонент для шапки профілю */}
      {/* Секція зі статтями */}
      <div className={css.articlesSection}>
        <div className={css.tabs}>
        <NavLink to="/profile/articles" className={css.link}>
          My Articles
        </NavLink>

        <NavLink to="/profile/saved" className={css.link}>
          Saved Articles
        </NavLink>
      </div>

      <div className={css.articlesGrid}>
        {myArticles.length > 0 ? (
          myArticles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))
          ) : (
            <p>You haven't written any articles yet.</p>
          )}
    
        </div>
      </div>
    </div>
  </Container>
  );
};
export default ProfilePage;