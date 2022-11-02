import React, { useEffect, useState } from 'react';
import AdminPageLayout from '../../layouts/pagelayout/AdminLayout';
import { observer } from 'mobx-react-lite';
import { ItemsStore } from '../../store/storeInitialize';
import DeleteIcon from '@mui/icons-material/Delete';
import { BackspaceIcon, CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, XIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const ProductsListAdmin = () => {
  const router = useRouter();
  const [products, setProducts] = useState();
  const getAll = async () => {
    try {
      await ItemsStore.getAll();
      setProducts(ItemsStore.ItemList);
    } catch (error) {}
  };

  const deleteHandler = async (id) => {
    try {
      await ItemsStore.deleteProduct(id);
    } catch (error) {}
  };
  useEffect(() => {
    if (!ItemsStore.ItemList) {
      getAll();
    }
    setProducts(ItemsStore.ItemList);
  }, [ItemsStore.ItemList]);

  const navigation = [
    { name: 'Add Products', href: '/products', icon: PlusIcon, current: false },
    { name: 'Edit Products', href: 'list', icon: UsersIcon, current: true },
    { name: 'Edit Orders', href: 'orders', icon: FolderIcon, current: false },
    // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    // { name: 'Documents', href: '#', icon: InboxIcon, current: false },
    // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
  ];

  return (
    <AdminPageLayout navigation={navigation}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Products</h1>
            <p className="mt-2 text-sm text-gray-700">A list of products with product details</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                router.push('/products');
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Product
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Catogory
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Avaliblity
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products?.map((item) => (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={item.imageSrc} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{item.name.substring(0, 20)}</div>
                              <div className="text-gray-500">{item.description.substring(0, 20)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{item.description}</div>
                          <div className="text-gray-500">{item.description}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex rounded-full ${item.stock ? 'bg-green-100' : 'bg-red-100'} px-2 text-xs font-semibold leading-5 ${
                              item.stock ? 'text-green-800' : 'text-red-800'
                            }`}
                          >
                            {item.stock ? 'In stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Rs.{item.price}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              router.push({
                                pathname: 'edit',
                                query: { id: item._id },
                              });
                            }}
                            className="text-yellow-600 hover:text-yellow-500"
                          >
                            Edit
                          </button>
                          <button
                            className="px-4"
                            onClick={() => {
                              deleteHandler(item._id);
                            }}
                          >
                            <DeleteIcon className="text-red-500 cursor-pointer" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default observer(ProductsListAdmin);
