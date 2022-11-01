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
    });
  }

  async placeOrder(order) {
    return axiosInstance.post(`${this.baseURL}${this.endPointURL}/create/`, order);
  }
  async getUserOrders() {
    return axiosInstance.get(`${this.baseURL}${this.endPointURL}/retrieve-user-ordders/`);
  }
}

export default OrderServices;
