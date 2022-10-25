import { action, makeObservable, observable } from 'mobx';
import { toJS } from 'mobx';

class DataStore {
  ItemList = [];
  state = [];
  orderTotal = 0;
  itemTotal = 0;
  tax = null;
  dataItem = null;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      ItemList: observable,
      dataItem: observable,
      orderTotal: observable,
      itemTotal: observable,
      tax: observable,
      addItem: action,
      fetchAll: action,
      totalValue: action,
      removeItem: action,
    });
  }

  addItem(item) {
    if (!this.ItemList.find(({ id }) => id === item.id)) {
      let newItem = item;
      newItem.count = 1;
      this.ItemList.push(newItem);
    } else {
      this.state.push({ success: false, message: 'Cannot add Duplicate Items' });
    }
    this.state = [];
  }
  fetchAll() {
    return this.ItemList;
  }
  totalValue(shipping, tax) {
    let subTotal = 0;
    let fees = 0;
    this.ItemList.forEach((items) => {
      subTotal = subTotal + items.price * items.count;
    });
    if (shipping) {
      fees = fees + shipping;
    }
    if (tax) {
      fees = fees + tax;
    }
    this.itemTotal = subTotal;
    this.orderTotal = subTotal + fees;
    this.tax = { shipping: shipping, tax: tax };
    return { shipping: shipping, tax: tax, total: fees + subTotal };
  }

  itemCount(item, count) {
    let qty = parseInt(count);
    let index = this.ItemList.findIndex((obj) => obj.id == item.id);
    this.ItemList[index].count = qty;
  }
  removeItem(item) {
    let deductPrice = 0;
    deductPrice = item.price * item.count;
    this.orderTotal = this.orderTotal - deductPrice;
    this.itemTotal = this.itemTotal - deductPrice;
    this.ItemList.filter((item) => item.id !== item.id);
    this.ItemList.splice(
      this.ItemList.findIndex((a) => a.id === item.id),
      1
    );
  }
}
export default DataStore;
