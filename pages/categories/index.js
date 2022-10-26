import React from 'react';
import Banner from '../../components/banner/Banner';
import Category from '../../components/category/Category';
import PageLayout from '../../layouts/pagelayout/PageLayout';
import Categories from '../../public/img/organization.png';

const index = () => {
  const header = 'See Categories';
  const content = 'List down and Filter what you want here.';
  return (
    <PageLayout>
      <div className="h-fit">
        <Banner image={Categories} header={header} content={content}></Banner>
      </div>
      <Category />
    </PageLayout>
  );
};

export default index;
