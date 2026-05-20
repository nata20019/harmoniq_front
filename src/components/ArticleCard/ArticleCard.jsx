import React from 'react';
import css from './ArticleCard.module.css';

const ArticleCard = ({ article }) => {
  if (!article) return null; // Захист від помилок

  const { title, description, image, category, owner } = article;
  // 1. Дефолтний аватар (можна взяти будь-яке посилання або локальний файл)
  const DEFAULT_AVATAR =
    'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  const imageUrl = image?.startsWith('http')
    ? image
    : `http://localhost:5000/${image?.replace(/\\/g, '/')}`;

  // 3. Безпечне формування аватара
  let avatarUrl = DEFAULT_AVATAR; // Спочатку ставимо дефолт

  if (owner?.avatarURL) {
    avatarUrl = owner.avatarURL.startsWith('http')
      ? owner.avatarURL
      : `http://localhost:5000/${owner.avatarURL.replace(/\\/g, '/')}`;
  }
// console.log("Дані власника статті:", owner);
  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <img src={imageUrl} alt={title} className={css.articleImage} />
        {category && <span className={css.categoryBadge}>{category}</span>}
      </div>

      <div className={css.content}>
        <h3 className={css.articleTitle}>{title}</h3>
        <p className={css.description}>{description}</p>

        <div className={css.authorBox}>
          <img
            src={avatarUrl}
            alt={owner?.username || 'avatar'}
            className={css.avatar}
            onError={e => {
              e.target.src = DEFAULT_AVATAR;
            }}
          />
          <span className={css.authorName}>{owner?.username || 'Unknown'}</span>
          <button className={css.moreBtn}>Learn more</button>
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;
