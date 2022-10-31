import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { observer } from 'mobx-react-lite';
import {Store} from '../../store/storeInitialize';

const paymentMethods = [
  { id: 1, title: 'Credit Card', turnaround: '4–10 business days', price: '$5.00' },
  { id: 2, title: 'Cash on Delivery', turnaround: '2–5 business days', price: '$16.00' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Checkout = () => {
  const [paymentMethod, setSelectPaymentMethod] = useState(paymentMethods[0]);
  const [products, setProducts] = useState(Store.ItemList);
  const [prices, setPrices] = useState({ subTotal: Store.itemTotal, total: Store.orderTotal });
  const [tax, setTax] = useState(Store.tax);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      autoComplete="family-name"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                    Apartment, suite, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup value={paymentMethod} onChange={setSelectPaymentMethod}>
                <RadioGroup.Label className="text-lg font-medium text-gray-900">Payment method</RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {paymentMethods.map((paymentMethod) => (
                    <RadioGroup.Option
                      key={paymentMethod.id}
                      value={paymentMethod}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? 'border-transparent' : 'border-gray-300',
                          active ? 'ring-2 ring-indigo-500' : '',
                          'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                {paymentMethod.title}
                              </RadioGroup.Label>
                            </span>
                          </span>
                          {checked ? <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" /> : null}
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked ? 'border-indigo-500' : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-lg'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className={`mt-10 border-t border-gray-200 pt-10 ${paymentMethod.id === 2 ? 'hidden' : 'block'}`}>
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-4">
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full py-2 first-letter:rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img src={product.imageSrc} alt={product.imageAlt} className="w-20 rounded-md" />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.title}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">{product.name}</p>
                          <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">Rs{product.price}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">Rs{prices.subTotal}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">Rs{tax && tax.shipping}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">Rs{tax && tax.tax}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">Rs{prices.total}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default observer(Checkout);
