import { useLocation } from 'react-router-dom';
import Header from './Header';
// import Footer from './Footer'; // commented out

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${!isHome ? 'pt-28 pb-10 px-4 sm:px-6 lg:px-8' : ''}`}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;