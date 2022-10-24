import React from 'react';
import Banner from '../../components/banner/Banner';
import Book from '../../public/img/books.png';

const BannerComponent = () => {
  return (
    <div>
      <Banner image={Book} />
    </div>
  );
};

export default BannerComponent;
