import Banner from '../../components/banner/Banner';
import { products } from '../../const/products';
import PageLayout from '../../layouts/pagelayout/PageLayout';
import ShopNow from '../../public/img/shopnow.png';
import Products from '../../components/products/Products';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const header = 'You can shop anything here';
  const content = 'Limitless Items to shop here';
  return (
    <PageLayout>
      <div className="h-fit">
        <Banner image={ShopNow} header={header} content={content}>
          <button
            className="h-20 border border-red-400 px-10 hover:bg-red-300 duration-200 hover:scale-105 hover:shadow-lg"
            onClick={() => {
              router.push('/categories');
            }}
          >
            See Categories
          </button>
        </Banner>
      </div>
      <Products products={products} />
    </PageLayout>
  );
}
