import React from 'react';
import NavBar from '../../components/nav-bar/NavBar';
import Menu from '../../components/menubar/Menu';

const NavigationComponent = () => {
  return (
    <div className="h-screen w-full">
      <NavBar />
      <div className="sticky top-0">
        <Menu />
      </div>
    </div>
  );
};

export default NavigationComponent;
