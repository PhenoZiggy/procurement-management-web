import Banner from '../components/banner/Banner';
import Categories from '../components/categories/Categories';
import PageLayout from '../layouts/pagelayout/PageLayout';
import building from '../public/img/building.png';
import { categories } from '../const/categories';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const header = 'We are Suppliers.lk';
  const content = `Sri Lanka's premier Construction, Industrial and Engineering marketplace`;
  return (
    <PageLayout>
      <Banner image={building} header={header} content={content}>
        <button
          className="h-20 border border-red-400 px-10 hover:bg-red-400 rounded-lg duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => {
            router.push('/shop');
          }}
        >
          Shop Now
        </button>
      </Banner>
      <Categories categories={categories} />
    </PageLayout>
  );
}
