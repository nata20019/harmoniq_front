import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';
// import Footer from '../Footer/Footer'; // Розкоментуйте, якщо файл Footer.jsx готовий

const SharedLayout = () => {
  return (
    <div>
      {/* <Header /> */}
      <main>
        {/* Outlet — це те, що дозволяє відображати HomePage або ArticlesPage всередині Layout */}
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default SharedLayout;
