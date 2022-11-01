import DataStore from './DataStore';
import ItemStore from './ItemStore';
import UserStore from './UserStore';
import OrderStore from './OrderStore';

export const Store = new DataStore();
export const ItemsStore = new ItemStore();
export const userStore = new UserStore();
export const orderStore = new OrderStore();
