import React from 'react';
import PageLayout from '../../layouts/pagelayout/PageLayout';
import Banner from '../../components/banner/Banner';
import Book from '../../public/img/books.png';

const LayoutPage = () => {
  const header = 'Cooking';
  const content =
    'New York Times Cooking offers recipes that inspire home cooks to make delicious meals every day. Our Cooking Collection celebrates all things tasty with playful pieces that spark creativity in the kitchen.';
  return (
    <PageLayout>
      <div className="h-fit">
        <Banner image={Book} header={header} content={content} />
      </div>
    </PageLayout>
  );
};

export default LayoutPage;
