import Button from '../Button/Button.jsx';
import Container from '../Container/Container.jsx';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.hero}>
      <Container>
        <div className={css.heroWrapper}>
          <div className={css.content}>
            <h1 className={css.name}>
              Find your <span className={css.accent}>harmony</span> in community
            </h1>
            <div className={css.buttons}>
              <Button
                to="/articles"
                className={css.buttonGo}
                onClick={() =>
                  window.scrollTo({ top: 800, behavior: 'smooth' })
                }
              >
                Go to Articles
              </Button>
              <Button to="/register" className={css.buttonRegister}>
                Register
              </Button>
            </div>
          </div>
          <div className={css.imageBlock}></div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
