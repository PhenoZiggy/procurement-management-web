import React from 'react';
import Menu from '../../components/menubar/Menu';
import NavBar from '../../components/nav-bar/NavBar';

const PageLayout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <div className="bg-yellow-200">
        <NavBar />
      </div>
      <div className="sticky top-0 bg-yellow-100 z-10">
        <Menu />
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
};

export default PageLayout;
