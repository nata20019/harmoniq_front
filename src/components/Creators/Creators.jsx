import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';
import css from './Creators.module.css';
import { getCreators } from '../../lib/api/api';

const Creators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await getCreators();
        setCreators(data.slice(0, 6));
      } catch (error) {
        console.error('Помилка при завантаженні авторів:', error);
      }
    };

    fetchCreators();
  }, []);

  const BASE_URL = 'http://localhost:5000/';

  return (
    <section className={css.creatorsSection}>
      <Container>
        <div className={css.header}>
          <h2 className={css.title}>Top Creators</h2>
          <a href="/creators" className={css.allLink}>
            Go to all Creators ↗
          </a>
        </div>

        <ul className={css.list}>
          {creators.map(({ _id, name, avatarURL }) => (
            <li key={_id} className={css.item}>
              <div className={css.avatarWrapper}>
                <img
                  src={
                    avatarURL.startsWith('http')
                      ? avatarURL
                      : `${BASE_URL}${avatarURL.replace(/\\/g, '/').replace('public/', '')}`
                  }
                  alt={name}
                  className={css.avatar}
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/150'; // Заглушка, якщо фото не знайдено
                  }}
                />
              </div>
              <p className={css.name}>{name}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Creators;
