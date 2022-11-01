import { action, makeObservable, observable } from 'mobx';
import { orderServices } from '../pages/api/serviceInitializer';

class OrderStore {
  response = null;
  isLoading = false;
  orders = null;

  constructor() {
    makeObservable(this, {
      response: observable,
      isLoading: observable,
      orders: observable,
      placeOrder: action,
      userOrders: action,
      setLoading: action,
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
}
export default OrderStore;
