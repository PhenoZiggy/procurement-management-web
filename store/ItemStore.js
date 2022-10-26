import { action, makeObservable, observable } from 'mobx';
import { products } from '../const/products';

class DataStore {
  ItemList = products;
  filteredItems = null;

  constructor() {
    makeObservable(this, {
      ItemList: observable,
      filteredItems: observable,
      filterItems: action,
    });
  }

  filterItems(filter) {
    let Items = [];
    filter.forEach((keywords) => {
      this.ItemList.forEach((item) => {
        if (item.categoris.id == keywords.value) {
          Items.push(item);
        }
      });
    });
    this.filteredItems = Items;
  }
}
export default DataStore;
