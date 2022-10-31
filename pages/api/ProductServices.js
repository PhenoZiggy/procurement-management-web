import axios, { AxiosResponse } from 'axios';
import { action, makeObservable } from 'mobx';
import axiosInstance from '../../middleware/setAxiosIntercepter';

class ProductServices {
  baseURL = process.env.NEXT_PUBLIC_API_URL;
  endPointURL = 'products';

  constructor() {
    makeObservable(this, {
      addProduct: action,
    });
  }

  async addProduct(product) {
    console.log('test');
    return axiosInstance.post(`${this.baseURL}${this.endPointURL}/create/`, product);
  }
}

export default ProductServices;
