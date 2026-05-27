import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import css from './Creators.module.css';
import { getCreators } from '../../lib/api/api';

const Creators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await getCreators();
        // Витягуємо масив саме з тієї структури, яку дає бекенд
        const usersArray = response.data.users;
        setCreators(usersArray.slice(0, 6));
      } catch (error) {
        console.error('Помилка при завантаженні авторів:', error);
      }
    };

    fetchCreators();
  }, []);

 const BASE_URL = 'https://harmoniq-back.onrender.com/';

  return (
    <section className={css.creatorsSection}>
      <Container>
        <div className={css.header}>
          <h2 className={css.title}>Top Creators</h2>
          <Link to="/creators" className={css.linkAll}>
            Go to all Creators ↗
          </Link>
        </div>

        <ul className={css.list}>
          {creators.map(({ _id, username, avatarURL }) => (
            <li key={_id} className={css.item}>
              <div className={css.avatarWrapper}>
                <img
                  src={
                    avatarURL.startsWith('http')
                      ? avatarURL
                      : `${BASE_URL}${avatarURL.replace(/\\/g, '/').replace('public/', '')}`
                  }
                  alt={username}
                  className={css.avatar}
               
                />
              </div>
              <p className={css.username}>{username}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Creators;
