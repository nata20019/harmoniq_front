import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import css from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <div className={css.appWrapper}>
      <Header />
      <main className={css.mainContent}>
        {/* Outlet — це те, що дозволяє відображати HomePage або ArticlesPage всередині Layout */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
