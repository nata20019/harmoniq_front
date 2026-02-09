import React from 'react';
import Container from '../Container/Container';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.footerContent}>
          <span className={css.logo}>harmoniq</span>
          <p className={css.copyright}>© 2025 Harmoniq. All rights reserved.</p>
          <nav className={css.links}>
            <a href="/articles">Articles</a>
            <a href="/account">Account</a>
          </nav>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
