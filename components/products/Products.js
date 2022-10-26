import Image from 'next/image';
import {Store} from '../../store/storeInitialize';
import { observer } from 'mobx-react-lite';

const Products = ({ products, header }) => {
  const AddToCart = (product) => {
    Store.addItem(product);
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">{header}</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative group">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:scale-105 duration-200"
                    objectFit="fill"
                    layout="fill"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                  <p className="relative text-lg font-semibold text-white">${product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  disabled={!product.stock}
                  onClick={() => {
                    AddToCart(product);
                  }}
                  className={`relative w-full flex items-center justify-center rounded-md border border-transparent py-2 px-8 text-sm font-medium text-white ${
                    product.stock ? 'bg-yellow-500 cursor-pointer' : 'bg-red-500 cursor-not-allowed'
                  } `}
                >
                  {product.stock ? 'Add to Cart' : 'Out of Stock'}
                  <span className="sr-only"> {product.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default observer(Products);
