import { action, makeObservable, observable } from 'mobx';
import { orderServices } from '../pages/api/serviceInitializer';

class OrderStore {
  response = null;
  isLoading = false;
  orders = null;
  allOrders = null;

  constructor() {
    makeObservable(this, {
      response: observable,
      isLoading: observable,
      orders: observable,
      allOrders: observable,
      placeOrder: action,
      userOrders: action,
      getAll: action,
      setLoading: action,
      updateStatus: action,
    });
  }
  async placeOrder(order) {
    try {
      this.setLoading(true);
      this.response = null;
      const response = await orderServices.placeOrder(order);
      this.response = response;
    } catch (error) {
      this.response = error.response;
    } finally {
      this.setLoading(false);
    }
  }
  async userOrders() {
    try {
      this.setLoading(true);
      this.orders = null;
      const response = await orderServices.getUserOrders();
      this.orders = response;
    } catch (error) {
      this.response = error.response;
    } finally {
      this.setLoading(false);
    }
  }
  setLoading(value) {
    this.isLoading = value;
  }
  async updateStatus(id, status) {
    try {
      this.setLoading(true);
      const response = await orderServices.updateStatus(id, status);
      this.getAll();
    } catch (error) {
    } finally {
      this.setLoading(false);
    }
  }
  async getAll() {
    try {
      this.setLoading(true);
      const response = await orderServices.getAllOrders();
      this.allOrders = response;
    } catch (error) {
      this.allOrders = error;
    } finally {
      this.setLoading(false);
    }
  }
}
export default OrderStore;
