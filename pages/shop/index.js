import Banner from '../../components/banner/Banner';
import { products } from '../../const/products';
import PageLayout from '../../layouts/pagelayout/PageLayout';
import Book from '../../public/img/books.png';
import Products from '../../components/products/Products';

export default function Home() {
  const header = 'Cooking';
  const content =
    'New York Times Cooking offers recipes that inspire home cooks to make delicious meals every day. Our Cooking Collection celebrates all things tasty with playful pieces that spark creativity in the kitchen.';
  return (
    <PageLayout>
      <div className="h-fit">
        <Banner image={Book} header={header} content={content}>
          <button className="h-20 border border-red-400 px-10">Shop Now</button>
        </Banner>
      </div>
      <Products products={products} />
    </PageLayout>
  );
}