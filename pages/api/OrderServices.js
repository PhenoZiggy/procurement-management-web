import axios, { AxiosResponse } from 'axios';
import { action, makeObservable } from 'mobx';
import axiosInstance from '../../middleware/setAxiosIntercepter';

class OrderServices {
  baseURL = process.env.NEXT_PUBLIC_API_URL;
  endPointURL = 'orders';

  constructor() {
    makeObservable(this, {
      placeOrder: action,
      getUserOrders: action,
      updateStatus: action,
      getAllOrders: action,
    });
  }

  async placeOrder(order) {
    return axiosInstance.post(`${this.baseURL}${this.endPointURL}/create/`, order);
  }
  async getUserOrders() {
    return axiosInstance.get(`${this.baseURL}${this.endPointURL}/retrieve-user-ordders/`);
  }
  async updateStatus(id, status) {
    return axiosInstance.put(`${this.baseURL}${this.endPointURL}/update-status`, { id: id, status: status });
  }
  async getAllOrders() {
    return axiosInstance.get(`${this.baseURL}${this.endPointURL}/getall`);
  }
}

export default OrderServices;
