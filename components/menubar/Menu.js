import React from 'react';
import { navigation } from '../../const/navigation';
import Cart from '../cart/Cart';

const Menu = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div className="flex flex-1 items-center justify-around sticky top-0 py-2">
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(item.current ? 'bg-[#3AA39F] text-white' : 'text-gray-500 hover:bg-yellow-500 hover:text-white', 'px-3 py-2 rounded-md text-sm font-bold')}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      <div className="hover:scale-110 duration-200 cursor-pointer">
        <Cart />
      </div>
    </div>
  );
};

export default Menu;
