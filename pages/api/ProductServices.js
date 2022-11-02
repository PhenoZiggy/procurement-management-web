import axios, { AxiosResponse } from 'axios';
import { action, makeObservable } from 'mobx';
import axiosInstance from '../../middleware/setAxiosIntercepter';

class ProductServices {
  baseURL = process.env.NEXT_PUBLIC_API_URL;
  endPointURL = 'products';

  constructor() {
    makeObservable(this, {
      addProduct: action,
      getAll: action,
      deleteProduct: action,
      getOneProduct: action,
      updateProduct: action,
    });
  }

  async addProduct(product) {
    return axiosInstance.post(`${this.baseURL}${this.endPointURL}/create/`, product);
  }
  async getAll() {
    return axios.get(`${this.baseURL}${this.endPointURL}/get-all/`);
  }
  async deleteProduct(id) {
    return axios.delete(`${this.baseURL}${this.endPointURL}/delete/${id}`);
  }
  async getOneProduct(id) {
    return axios.get(`${this.baseURL}${this.endPointURL}/get-by-id?id=${id}`);
  }
  async updateProduct(product) {
    return axios.put(`${this.baseURL}${this.endPointURL}/update`, { product: product });
  }
}

export default ProductServices;
