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
      let foundItem = this.ItemList.find((o) => o.categoris.id == keywords.value);
      if (foundItem) {
        Items.push(foundItem);
      }
    });
    this.filteredItems = Items;
  }
}
export default DataStore;
