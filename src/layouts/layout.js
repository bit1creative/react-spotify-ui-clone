import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
