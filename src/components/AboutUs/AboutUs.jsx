import React from 'react';
import Container from '../Container/Container';
import css from './AboutUs.module.css';
import flowerImg from '../assets/images/lotus.jpg';
import communityImg from '../assets/images/people.jpg';
import meditationImg from '../assets/images/meditation.jpg';

const AboutUs = () => {
  return (
    <section className={css.aboutSection}>
      <Container>
        <div className={css.gridContainer}>
          {/* Текстовий блок */}
          <div className={css.textCard}>
            <h2 className={css.title}>About us</h2>
            <p className={css.description}>
              Harmoniq is a mindful publishing platform dedicated to mental
              health and well-being. We bring together writers, thinkers, and
              readers who believe that open, thoughtful stories can heal,
              inspire, and connect. Whether you're here to share your journey or
              learn from others — this is your space to slow down, reflect, and
              grow.
            </p>
          </div>

          {/* Картка з лотосом */}
          <div className={css.imageCardSmall}>
            <img src={flowerImg} alt="Lotus flower" className={css.image} />
          </div>

          {/* Картка з людьми (широка) */}
          <div className={css.imageCardWide}>
            <img src={communityImg} alt="Community" className={css.image} />
          </div>

          {/* Картка з медитацією */}
          <div className={`${css.imageCardSmall} ${css.meditationCard}`}>
            <img src={meditationImg} alt="Meditation" className={css.image} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
