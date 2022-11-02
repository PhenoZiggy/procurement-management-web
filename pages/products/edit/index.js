import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../layouts/pagelayout/AdminLayout';
import { ItemsStore } from '../../../store/storeInitialize';
import firebaseUpload from '../../../utils/firebaseUpload';
import { BackspaceIcon, CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, XIcon, PlusIcon } from '@heroicons/react/outline';
import { toJS } from 'mobx';

const Index = () => {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState();
  //file states
  const [file, setFile] = useState(null);
  const [url, setURL] = useState();
  const [urlNew, seturlNew] = useState();
  const [percentage, setPercentage] = useState(null);
  //file states ending here

  const { id } = router.query;

  const handleOnSubmit = async () => {
    const product = {
      _id: id,
      name: productName,
      description: description,
      price: price,
      stock: true,
      quantity: quantity,
      imageSrc: urlNew ? urlNew[0] : url[0],
      imageAlt: productName,
      categories: category,
    };
    try {
      await ItemsStore.updateProduct(product);
    } catch (error) {
    } finally {
      if (ItemsStore.product.updateRes.status == 200) {
        toast('Updated success', { hideProgressBar: true, autoClose: 2000, type: 'success' });
      } else {
        toast('Something went wrong', { hideProgressBar: true, autoClose: 2000, type: 'error' });
      }
      setProductName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategory('');
      setFile(null);
      setURL(null);
      setPercentage(null);
    }
  };

  const handleChange = (event) => {
    const newFiles = [];
    for (let j = 0; j < event.target.files.length; j++) {
      newFiles.push(event.target.files[j]);
    }
    setFile(newFiles);
  };

  //File upload
  const handleUpload = async (event) => {
    event.preventDefault();
    ItemsStore.setIsloading(true);
    if (file) {
      await firebaseUpload(file, setPercentage, seturlNew, 'products');
    } else {
      handleOnSubmit();
    }
  };

  const categoryHandler = (e) => {
    const value = e.target.value;
    switch (value) {
      case '1':
        setCategory({ value: 1, label: 'Plants and Machinery', id: 1 });
        break;
      case '2':
        setCategory({ value: 2, label: 'Products', id: 2 });
        break;
      case '3':
        setCategory({ value: 3, label: 'Industrial', id: 3 });
        break;
      case '4':
        setCategory({ value: 4, label: 'Materials', id: 4 });
        break;
      default:
        break;
    }
  };

  const getOneProduct = async (id) => {
    try {
      const response = await ItemsStore.getOneProduct(id);
    } catch (error) {
      console.error(error);
    } finally {
      console.log(ItemsStore.product);
      setProductName(ItemsStore.product.data.name);
      setDescription(ItemsStore.product.data.description);
      setPrice(ItemsStore.product.data.price);
      setQuantity(ItemsStore.product.data.quantity);
      setCategory(ItemsStore.product.data.categories);
      setURL([ItemsStore.product.data.imageSrc]);
    }
  };

  useEffect(() => {
    if (id) {
      getOneProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (urlNew) {
      ItemsStore.setIsloading(false);
      setPercentage(null);
      handleOnSubmit();
    }
  }, [urlNew]);

  useEffect(() => {
    if (ItemsStore.itemResponse) {
      if (ItemsStore.itemResponse.status == 200) {
        toast('Item Added Successfull', { hideProgressBar: true, autoClose: 5000, type: 'success' });
      } else {
        console.log(ItemsStore.itemResponse.message);
        toast(ItemsStore.itemResponse.message, { hideProgressBar: true, autoClose: 5000, type: 'error' });
      }
    }
  }, [ItemsStore.itemResponse]);

  const navigation = [
    { name: 'Add Products', href: '/products', icon: PlusIcon, current: false },
    { name: 'Edit Products', href: '/products/list', icon: UsersIcon, current: true },
    { name: 'Edit Orders', href: '/products/orders', icon: FolderIcon, current: false },
    // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    // { name: 'Documents', href: '#', icon: InboxIcon, current: false },
    // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
  ];

  const isChecked = (id) => {
    if (category?.id == id) {
      return true;
    }
  };

  return (
    <AdminLayout navigation={navigation} title='Edit Product'>
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleUpload}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Product Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="username"
                      required
                      id="username"
                      autoComplete="username"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      value={productName}
                      className="block py-2 w-full border border-gray-400 min-w-0 flex-1 rounded-none rounded-r-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Description
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    required
                    className="block p-3 w-full max-w-lg rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                  <p className="mt-2 text-sm text-gray-500">Write a few sentences about the product.</p>
                </div>
              </div>

              <div className={`sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5`}>
                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Upload Photo
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className={`flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 ${file ? 'bg-green-50' : 'bg-white'}`}>
                    <div className="space-y-1 text-center">
                      <svg className={`mx-auto h-12 w-12 ${file ? 'text-green-500' : 'text-gray-400'}`} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" className="sr-only" type="file" onChange={handleChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex justify-center ${percentage ? 'block' : 'hide'}`}>
              <Stack spacing={2} direction="row">
                <CircularProgress variant="determinate" value={percentage} />
              </Stack>
            </div>
          </div>

          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Product Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Price
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="number"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full max-w-lg py-2  border-2 rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    value={price}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Quantity
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="number"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full max-w-lg border border-gray-400 rounded-md py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    value={quantity}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
            <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
              <div className="pt-6 sm:pt-5">
                <div role="group" aria-labelledby="label-notifications">
                  <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                    <div>
                      <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-notifications">
                        Product Categories
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="max-w-lg">
                        <p className="text-sm text-gray-500">Choose product category here</p>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="1"
                              name="push-notifications"
                              type="radio"
                              value="1"
                              onChange={categoryHandler}
                              checked={isChecked(id)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="1" className="ml-3 block text-sm font-medium text-gray-700">
                              Plants and Machinery
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="2"
                              name="push-notifications"
                              type="radio"
                              value="2"
                              onChange={categoryHandler}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={isChecked(id)}
                            />
                            <label htmlFor="2" className="ml-3 block text-sm font-medium text-gray-700">
                              Products
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="3"
                              name="push-notifications"
                              type="radio"
                              value="3"
                              onChange={categoryHandler}
                              checked={isChecked(id)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="3" className="ml-3 block text-sm font-medium text-gray-700">
                              Industrial
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="4"
                              name="push-notifications"
                              type="radio"
                              value="4"
                              onChange={categoryHandler}
                              checked={isChecked(id)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="4" className="ml-3 block text-sm font-medium text-gray-700">
                              Materials
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
export default observer(Index);
