import { action, makeObservable, observable } from 'mobx';
import { products } from '../const/products';

class DataStore {
  ItemList = products;
  ItemsPerPage = null;
  filteredItems = null;

  constructor() {
    makeObservable(this, {
      ItemList: observable,
      filteredItems: observable,
      filterItems: action,
      pages: action,
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

  pages(page_number = 1) {
    return this.ItemList.slice((page_number - 1) * 8, page_number * 8);
  }
  pagesForFilter(page_number = 1) {
    if (this.filteredItems) {
      return this.filteredItems.slice((page_number - 1) * 8, page_number * 8);
    }
  }
}
export default DataStore;
