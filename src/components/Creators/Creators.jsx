import React from 'react';
import Container from '../Container/Container';
import css from './Creators.module.css';
// Приклад імпорту аватарок (замініть на свої шляхи)
import naomiImg from '../assets/images/naomi.jpg';
import andriiImg from '../assets/images/andrii.jpg';
import emmaImg from '../assets/images/emma.jpg';
import maxImg from '../assets/images/max.jpg';
import tonyImg from '../assets/images/tony.jpg';
import tailorImg from '../assets/images/tailor.jpg';

const creators = [
  { id: 1, name: 'Naomi', img: naomiImg },
  { id: 2, name: 'Andrii', img: andriiImg },
  { id: 3, name: 'Emma', img: emmaImg },
  { id: 4, name: 'Max', img: maxImg },
  { id: 5, name: 'Tony', img: tonyImg },
  { id: 6, name: 'Tailor', img: tailorImg },
];

const Creators = () => {
  return (
    <section className={css.creatorsSection}>
      <Container>
        <div className={css.header}>
          <h2 className={css.title}>Top Creators</h2>
          <a href="/creators" className={css.linkAll}>
            Go to all Creators ↗
          </a>
        </div>
        <ul className={css.creatorsList}>
          {creators.map(({ id, name, img }) => (
            <li key={id} className={css.creatorItem}>
              <div className={css.avatarWrapper}>
                <img src={img} alt={name} className={css.avatar} />
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
