import { action, makeObservable, observable } from 'mobx';
import { toJS } from 'mobx';

class DataStore {
  ItemList = [];
  state = [];
  dataItem = null;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      ItemList: observable,
      dataItem: observable,
      addItem: action,
      fetchAll: action,
      totalValue: action,
    });
  }

  addItem(item) {
    if (!this.ItemList.find(({ id }) => id === item.id)) {
      this.ItemList.push(item);
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
      console.log(toJS(items));
      if (items.count) {
        subTotal = subTotal + items.price * items.count;
      } else {
        subTotal = subTotal + items.price;
      }
    });
    if (shipping) {
      fees = fees + shipping;
    }
    if (tax) {
      fees = fees + tax;
    }
    return { shipping: shipping, tax: tax, total: fees + subTotal };
  }

  itemCount(item, count) {
    let qty = parseInt(count);
    let index = this.ItemList.findIndex((obj) => obj.id == item.id);
    this.ItemList[index].count = qty;
  }
}
export default DataStore;
