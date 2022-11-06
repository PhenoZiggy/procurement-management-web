import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageLayout from '../../layouts/pagelayout/PageLayout';
import { ItemsStore, orderStore } from '../../store/storeInitialize';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Index = () => {
  const [orders, setOrders] = useState();

  const oneProduct = async (id) => {
    await ItemsStore.getOneProduct(id);
  };

  const getUserOrders = async () => {
    try {
      const resposne = await orderStore.userOrders();
    } catch (error) {
      console.error(error);
    } finally {
      if (orderStore.orders.status === 200) {
        setOrders(toJS(orderStore.orders.data));
      } else {
        toast('Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (!orderStore.orders) {
      getUserOrders();
    }
  }, []);

  const calAmount = (val, val2) => {
    return val * val2;
  };

  const totalAmount = (obj) => {
    let total = 0;
    obj.productsWithAmount.map((data) => {
      total = total + data?.amount * data?.price;
    });
    return total;
  };

  return (
    <PageLayout>
      <div className="bg-gray-50">
        {orders &&
          orders.map((product) => (
            <div key={product._id} className="mx-auto max-w-2xl pt-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                <div className="flex sm:items-baseline sm:space-x-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order #{product._id.substring(0, 6)}</h1>
                  <a href="#" className="hidden text-sm font-medium text-yellow-500 hover:text-yellow-400 sm:block">
                    View invoice
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
                <p className="text-sm text-gray-600">
                  Order placed
                  <time dateTime="2021-03-22" className="font-medium text-gray-900">
                    <span className="px-1"> {moment(product.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                  </time>
                </p>
                <a href="#" className="text-sm font-medium text-yellow-500 hover:text-yellow-400 sm:hidden">
                  View invoice
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>

              {/* Products */}
              <div className="mt-6">
                <h2 className="sr-only">Products purchased</h2>

                <div className="space-y-8">
                  <div key={product.id} className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                    <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                      {product.productsWithAmount?.map((item) => (
                        <div className="sm:flex lg:col-span-7 py-2" key={item?._id}>
                          <div className="aspect-w-1 aspect-h-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                            <img src={item?.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center sm:h-full sm:w-full" />
                          </div>

                          <div className="mt-6 sm:mt-0 sm:ml-6">
                            <h3 className="text-base font-medium text-gray-900">
                              <span>{item?.name}</span>
                            </h3>
                            <p className="mt-2 text-sm font-medium text-gray-900">
                              Rs.{item?.price} x {item?.amount} = {calAmount(item?.price, item?.amount)}
                            </p>
                            <p className="mt-3 text-sm text-gray-500">{product.description}</p>
                          </div>
                        </div>
                      ))}

                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <dl className="grid grid-cols-2 gap-x-6 text-sm">
                          <div>
                            <dt className="font-medium text-gray-900">Delivery address</dt>
                            <dd className="mt-3 text-gray-500">
                              <span className="block">{product.userData.address.address}</span>
                              <span className="block">{product.userData.address.apmnt}</span>
                              <span className="block">{product.userData.address.city}</span>
                              <span className="block">{product.userData.address.postal}</span>
                              <span className="block">{product.userData.address.state}</span>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">Shipping updates</dt>
                            <dd className="mt-3 space-y-3 text-gray-500">
                              <p>{product.email}</p>
                              <p>{product.userData.address.phone}</p>
                              <button type="button" className="font-medium text-yellow-500 hover:text-yellow-400">
                                Edit
                              </button>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
                      <h4 className="sr-only">Status</h4>
                      <p className="text-sm font-medium text-gray-900">
                        {product.status} on <time dateTime={product.datetime}>{product.date}</time>
                      </p>
                      <div className="mt-6" aria-hidden="true">
                        <div className="overflow-hidden rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-yellow-500" style={{ width: `calc((${product.orderStatus} * 2 + 1) / 8 * 100%)` }} />
                        </div>
                        <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                          <div className="text-yellow-500">Order placed</div>
                          <div className={classNames(product.step > 0 ? 'text-yellow-600' : '', 'text-center')}>Processing</div>
                          <div className={classNames(product.step > 1 ? 'text-yellow-600' : '', 'text-center')}>Shipped</div>
                          <div className={classNames(product.step > 2 ? 'text-yellow-600' : '', 'text-right')}>Delivered</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing */}
              <div className="mt-16">
                <h2 className="sr-only">Billing Summary</h2>

                <div className="bg-gray-100 py-6 px-4 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
                  <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                    <div>
                      <dt className="font-medium text-gray-900">Billing address</dt>
                      <dd className="mt-3 text-gray-500">
                        <span className="block">{product.userData.address.address}</span>
                        <span className="block">{product.userData.address.city}</span>
                        <span className="block">{product.userData.address.postal}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Payment information</dt>
                      <dd className="-ml-4 -mt-1 flex flex-wrap">
                        <div className="ml-4 mt-4 flex-shrink-0">
                          {!product.userData.paymentMethod.type == 'Cash on Delivery' && (
                            <svg aria-hidden="true" width={36} height={24} viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                              <rect width={36} height={24} rx={4} fill="#224DBA" />
                              <path
                                d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                                fill="#fff"
                              />
                            </svg>
                          )}

                          <p className="sr-only">{product.userData.paymentMethod.type}</p>
                        </div>
                        <div className="ml-4 mt-4">
                          <p className="text-gray-900">{product.userData.paymentMethod.data.name}</p>
                          <p className="text-gray-600">{product.userData.paymentMethod.data.cardNo}</p>
                        </div>
                      </dd>
                    </div>
                  </dl>

                  <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
                    <div className="flex items-center justify-between pt-4">
                      <dt className="font-medium text-gray-900">Order total</dt>
                      <dd className="font-medium text-yellow-500">Rs.{totalAmount(product)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
      </div>
    </PageLayout>
  );
};

export default observer(Index);
