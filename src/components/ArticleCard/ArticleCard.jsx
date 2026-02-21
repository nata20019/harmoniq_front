import React from 'react';
import css from './ArticleCard.module.css';

const ArticleCard = ({ data }) => {

  const { title, owner, image, category } = data;
const BASE_URL = 'http://localhost:5000/';


  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img
          src={
            `${BASE_URL}${image}` ||
            `https://picsum.photos/seed/${data._id}/400/300`
          }
          alt={title}
          className={css.articleImage}
        />
        {category && <span className={css.categoryBadge}>{category}</span>}
      </div>

      <div className={css.content}>
        <h3 className={css.articleTitle}>{title}</h3>
        <p className={css.articleText}>{data.description}</p>

        <div className={css.authorBox}>
          {/* <img
            src={owner?.avatarUrl || '/default-avatar.png'}
            alt={owner?.name}
            className={css.avatar}
          /> */}
          <div className={css.authorText}>
            <p className={css.authorName}>{owner?.name || 'Unknown Author'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
